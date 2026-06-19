import CollectionCard from "./CollectionCard";

export default function CollectionList({
  collections,
  onDelete,
  onAddMovie,
  onRemoveMovie,
}) {
  return (
    <div>
      {collections.map((c) => (
        <CollectionCard
          key={c.collection_id}
          collection={c}
          onDelete={onDelete}
          onAddMovie={onAddMovie}
          onRemoveMovie={onRemoveMovie}
        />
      ))}
    </div>
  );
}