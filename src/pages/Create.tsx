import CustomForm from "../components/CustomForm";
import { NoteData, Tag } from "../types";

export type CreateProps = {
  createTag: (tag: Tag) => void;
  handleSubmit: (NoteData: NoteData) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

const Create = ({ createTag, handleSubmit, availableTags }: CreateProps) => {
  return (
    <div className="container p-5">
      <h2>Yeni Not Oluştur</h2>
      <CustomForm
        createTag={createTag}
        handleSubmit={handleSubmit}
        availableTags={availableTags}
      />
    </div>
  );
};

export default Create;
