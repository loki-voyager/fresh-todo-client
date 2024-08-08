type Base64PicProps = {
  base64Codes: string[];
};

const Base64Pic = ({ base64Codes }: Base64PicProps) => {
  return (
    <>
      {base64Codes.length > 0 && (
        <>
          <div className="picBlock">
            {base64Codes.map((base64, index) => (
              <img src={base64} alt={`Base64 Image ${index}`} key={index} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export { Base64Pic };
