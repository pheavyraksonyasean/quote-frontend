
interface ProfileProps {
  src: string;
  alt?: string;
  size?: number;
}

const Profile = ({ src, alt = "profile", size = 150 }: ProfileProps) => {
  return (
    <div
      className={`rounded-full overflow-hidden border-4 border-purple-500 shadow-lg`}
      style={{ width: size, height: size }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};

export default Profile