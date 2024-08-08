
const UserPicGet = async ({
  data,
  token,
  setError,
}: {
  data: string;
  token: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}): Promise<string[]> => {
  try {
    const res = await fetch("http://localhost:8080/UserPic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data }),
    });

    if (!res.ok) {
      throw new Error("Network response was not ok " + res.statusText);
    }

    const { pic } = await res.json();
    return pic;
  } catch (error: any) {
    setError(error.message);
    return [];
  }
};

export { UserPicGet };
