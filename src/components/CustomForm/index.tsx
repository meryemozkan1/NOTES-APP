import { FormEvent, useRef, useState } from "react";
import { Form, Col, Row, Button, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { CreateProps } from "../../pages/Create";
import { Tag } from "../../types";
import { v4 } from "uuid";

const CustomForm = ({
  createTag,
  handleSubmit,
  availableTags,
  markdown = "",
  tags = [],
  title = "",
}: CreateProps) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const textareRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  //form gönderilince
  const handleSend = (e: FormEvent) => {
    e.preventDefault();

    //Yeni oluşturulan notu kaydet
    handleSubmit({
      title: inputRef.current?.value as string,
      markdown: textareRef.current?.value as string,
      tags: selectedTags,
    });
    //Anasayfaya yönlendir
    navigate("/");
  };

  return (
    <Form onSubmit={handleSend} className="mt-4">
      {/* Başlık - Etiket Inputu */}
      <Row>
        <Col>
          <Form.Group controlId="title">
            <Form.Label>Başlık</Form.Label>
            <Form.Control defaultValue={title} ref={inputRef} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="tags">
            <Form.Label>Etiketler</Form.Label>
            <ReactSelect
              className="text-black"
              isMulti
              options={availableTags}
              onChange={(allTags) => setSelectedTags(allTags as Tag[])}
              onCreateOption={(text: string) => {
                //Etiket nesnesini oluştur ve id ekle
                const newTag: Tag = { label: text, value: v4() };

                //Yeni etiketi Locale kaydet
                createTag(newTag);

                //Seçili etiketler statenie ekle
                setSelectedTags([...selectedTags, newTag]);
              }}
              value={selectedTags}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* İÇERİK */}
      <Form.Group controlId="markdown" className="mt-4">
        <Form.Label>İçerik (markdown destekler)</Form.Label>
        <Form.Control
          defaultValue={markdown}
          ref={textareRef}
          as={"textarea"}
          style={{ minHeight: "300px", maxHeight: "500px" }}
        />
      </Form.Group>

      {/* Butonlar */}
      <Stack
        direction="horizontal"
        className="justify-content-end mt-5"
        gap={4}
      >
        <Link to={".."}>
          <Button type="button" variant="secondary">
            Geri
          </Button>
        </Link>
        <Button type="submit">Kaydet</Button>
      </Stack>
    </Form>
  );
};

export default CustomForm;
