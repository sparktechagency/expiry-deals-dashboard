/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/redux/features/category/categoryApi";
import { ICategory, IQueryParams } from "@/types";
import { Icon } from "@iconify/react";
import { Button, Flex, Image, Input, Table, TableProps, Tooltip } from "antd";
import { Plus } from "lucide-react";
import { useState } from "react";
import EditCategoryModal from "./EditCategoryModal";
import { useSearchParams } from "next/navigation";
import AddCategoryModal from "./AddCategoryModal";
import CustomConfirm from "@/components/custom/CustomConfirm";
import { toast } from "sonner";
const { Search } = Input;

export default function CategoriesContainer() {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null,
  );

  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const query: IQueryParams = {};
  const page = searchParams.get("page") || "1";

  query.page = page;
  query.searchTerm = searchTerm;

  // Get all categories
  const { data: categoriesRes, isLoading: categoriesLoading } =
    useGetAllCategoriesQuery({ ...query, limit: "999999" });
  const categories = categoriesRes?.data?.data || [];

  // Delete Category
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDeleteCategory = async (categoryId: string) => {
    const toastId = toast.loading("Processing...");
    try {
      await deleteCategory(categoryId).unwrap();
      toast.success("Category deleted successfully!", {
        id: toastId,
      });
    } catch (error: any) {
      toast.error(
        error?.message || error?.data?.message || "Failed to delete category!",
        {
          id: toastId,
        },
      );
    }
  };

  // -------------------- Table Columns ---------------------
  const columns: TableProps<ICategory>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Banner",
      dataIndex: "banner",
      render(value, record) {
        return (
          <Image
            src={value}
            alt={record?.name}
            height={30}
            width={30}
            className="object-cover"
          />
        );
      },
    },
    {
      title: "Action",
      render: (_, record) => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Edit Category">
            <button
              onClick={() => {
                setShowEditModal(true);
                setSelectedCategory(record);
              }}
            >
              <Icon
                color="#1B70A6"
                height={22}
                width={22}
                icon="basil:edit-outline"
              />

              <div className="sr-only">Edit Category</div>
            </button>
          </Tooltip>

          <CustomConfirm
            title="Delete category"
            description="Are you sure to delete this category?"
            onConfirm={() => handleDeleteCategory(record?._id)}
          >
            <Tooltip title="Delete Category">
              <button>
                <Icon
                  color="#F16365"
                  height={22}
                  width={22}
                  icon="tabler:trash"
                />

                <div className="sr-only">Delete Category</div>
              </button>
            </Tooltip>
          </CustomConfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="!space-y-5 rounded-xl bg-white p-5 pb-0">
      <Flex justify="between" align="center">
        <h4 className="flex-1 text-2xl font-semibold">Categories</h4>

        <Flex justify="end" gap={16} align="center" className="h-full w-1/3">
          <Button
            type="primary"
            size="large"
            icon={<Plus />}
            iconPosition="start"
            onClick={() => setShowAddModal(true)}
          >
            Add Category
          </Button>

          <Search
            placeholder="Search categories..."
            onSearch={(value) => setSearchTerm(value)}
            size="large"
            style={{
              width: 300,
            }}
            allowClear
          />
        </Flex>
      </Flex>

      <div className="">
        <Table
          style={{ overflowX: "auto" }}
          columns={columns}
          dataSource={categories}
          loading={categoriesLoading}
          scroll={{ x: "100%" }}
          pagination={{
            pageSize: 10,
          }}
        />
      </div>

      {showEditModal && selectedCategory && (
        <EditCategoryModal
          open={showEditModal}
          setOpen={() => setShowEditModal(false)}
          selectedCategory={selectedCategory}
        />
      )}

      {showAddModal && (
        <AddCategoryModal
          open={showAddModal}
          setOpen={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}
