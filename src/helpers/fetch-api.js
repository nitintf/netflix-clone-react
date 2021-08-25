export const fetchApi = async (link, type, getOne = false) => {
  const response = await fetch(link);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Could not Complete your request please try again"
    );
  }

  const { results } = data;

  const newData = results.map((item) => {
    return { ...item, type: type };
  });

  if (getOne) {
    const random = Math.floor(Math.random() * 20);
    const single = newData[random];
    return single;
  }
  return newData;
};
