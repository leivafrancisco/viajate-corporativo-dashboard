import { useParams } from "react-router-dom";

export default function EditCommunityView() {
  const { id } = useParams();

  return (
    <div>
      Editando comunidad con ID: {id}
    </div>
  );
}
