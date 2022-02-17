export default async function request(url, options = {}) {
  const res = await fetch(url, {
    method: "GET",
    ...options,
  });

  try {
    if (res.ok) {
      return await res.json();
    }

    throw new Error("API 처리 중 문제가 발생했습니다");
  } catch (e) {
    console.error(e);
  }
}
