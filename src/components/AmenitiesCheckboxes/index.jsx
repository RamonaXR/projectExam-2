/**
 * AmenitiesCheckboxes is a React component that renders a list of checkboxes
 * for selecting various amenities.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.id - The id for the container element.
 * @param {Function} props.register - The register function (e.g., from react-hook-form)
 *                                    used to register each input field.
 * @returns {JSX.Element} The rendered list of amenity checkboxes.
 */

export default function AmenitiesCheckboxes({ id, register }) {
  const amenities = [
    { name: "wifi", label: "WiFi" },
    { name: "parking", label: "Parking" },
    { name: "breakfast", label: "Breakfast" },
    { name: "pets", label: "Pets Allowed" },
  ];

  return (
    <div id={id} className="space-y-2">
      <span className="block font-bold">Amenities</span>
      {amenities.map((amenity) => (
        <div key={amenity.name} className="flex items-center">
          <input
            id={`amenity-${amenity.name}`}
            type="checkbox"
            {...register(`meta.${amenity.name}`)}
            className="mr-2"
          />
          <label htmlFor={`amenity-${amenity.name}`}>{amenity.label}</label>
        </div>
      ))}
    </div>
  );
}
