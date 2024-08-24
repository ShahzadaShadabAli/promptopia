import { useSession } from "next-auth/react";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const {data:session} = useSession()
  
  return (
    
    <section className="w-full">
      <h1 className="head_text text-left">
      <span className="blue_gradient">
  {session?.user?.id && data?.length > 0 && data[0]?.creator?._id
    ? name
    : `${name}'s`} Profile
</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-16 prompt_layout">
        {data?.map((d) => (
          <PromptCard
            post={d}
            handleEdit={() => handleEdit && handleEdit(d)}
            handleDelete={() => handleDelete && handleDelete(d)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
