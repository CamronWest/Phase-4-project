import Property from "./Property";

function PropertyList({ properties }) {
    return (
      <div>
        {properties.map((property) => (
          <Property key={property.id} property={property} />
        ))}
      </div>
    );
  }

  export default PropertyList;