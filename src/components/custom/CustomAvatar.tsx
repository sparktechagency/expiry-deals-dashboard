import { Avatar } from "antd";

interface CustomAvatarProps {
  src?: string;
  name?: string;
  size?: number;
}

export default function CustomAvatar({
  src,
  name,
  size = 24,
  ...props
}: CustomAvatarProps) {
  return src ? (
    <Avatar src={src} size={size} {...props} />
  ) : (
    <Avatar size={size} {...props}>
      {name}
    </Avatar>
  );
}
