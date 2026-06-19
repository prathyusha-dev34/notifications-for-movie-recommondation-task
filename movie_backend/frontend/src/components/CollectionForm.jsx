import { useState } from "react";

export default function CollectionForm({ onCreate }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate({
      name,
      description,
    });

    setName("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>Create Collection</h3>

      <input
        placeholder="Collection Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Create</button>
    </form>
  );
}