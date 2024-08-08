import { useState } from "react";

type Base64PicProps = {
  base64Codes: string[];
  setBase64Codes?: React.Dispatch<React.SetStateAction<string[]>>;
  permission?:boolean
};

const Base64ArrayModifier = ({
  base64Codes,
  setBase64Codes,
  permission
}: Base64PicProps) => {
  const [deletedCodes, setDeletedCodes] = useState<number[]>([]);

  const isDeleted = (index: number) => {
    return deletedCodes.includes(index);
  };

  const handleDelete = (index: number) => {
    if (deletedCodes.includes(index)) {
      setDeletedCodes(deletedCodes.filter((item) => item !== index));
    } else {
      setDeletedCodes([...deletedCodes, index]);
    }
  };

  const handleShow = () => {
    const updatedImages = base64Codes.filter(
      (_, index) => !deletedCodes.includes(index)
    );

    setBase64Codes && setBase64Codes(updatedImages);
    setDeletedCodes([]);
  };
  return (
    <>
      {base64Codes.length > 0 && (
        <>
          <div className="picBlock">
            {base64Codes.map((base64, index) => (
              <img
                className={`${
                  base64Codes.length > 1 || permission
                    ? isDeleted(index) ? "deleted cursor-pointer" : "cursor-pointer"
                    : ""
                }`}
                key={index}
                src={base64}
                alt={`Base64 Image ${index}`}
                onClick={() => {
                  if (base64Codes.length > 1 || permission) {
                    handleDelete(index);
                  }
                }}
              />
            ))}
          </div>
          {deletedCodes.length > 0 && (
            <div>
              <button className="btnGreen" onClick={handleShow}>
                Apply
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export { Base64ArrayModifier };
