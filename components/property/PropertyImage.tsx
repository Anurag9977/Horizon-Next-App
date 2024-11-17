import Image from "next/image";

function PropertyImage({
  propertyName,
  propertyImage,
}: {
  propertyName: string;
  propertyImage: string;
}) {
  return (
    <div className="relative h-96">
      <Image
        src={propertyImage}
        alt={propertyName}
        priority
        fill
        sizes="(max-width:1024px) 100vw, 50vw"
        className="object-cover h-full w-full rounded-lg"
      />
    </div>
  );
}
export default PropertyImage;
