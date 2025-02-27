export default function AmenitiesCheckboxes({ register }) {
  const amenities = [
    { name: "wifi", label: "WiFi" },
    { name: "parking", label: "Parking" },
    { name: "breakfast", label: "Breakfast" },
    { name: "pets", label: "Pets Allowed" },
  ];

  return (
    <div className="space-y-2">
      <span className="block font-bold">Amenities</span>
      {amenities.map((amenity) => (
        <div key={amenity.name} className="flex items-center">
          <input
            type="checkbox"
            {...register(`meta.${amenity.name}`)}
            className="mr-2"
          />
          <label>{amenity.label}</label>
        </div>
      ))}
    </div>
  );
}
