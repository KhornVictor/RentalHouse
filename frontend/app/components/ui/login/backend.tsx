type AuthUser = {
  username: string;
  password: string;
};

const findUser = async (
  username: string,
  password: string,
): Promise<AuthUser | null> => {
  const users = await getUser();
  const user = users.find(
    (user: AuthUser) => user.username === username && user.password === password,
  );
  return user ?? null;
};

const mockLogin = async (
  username: string,
  password: string,
): Promise<boolean> => {
  const user = await findUser(username, password);
  return !!user;
};

const getUser = async () => {
  try {
    const response = await fetch("/data/users.json");
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

const UserExist = async (username: string): Promise<boolean> => {
  const users = await getUser();
  return users.some((user: { username: string }) => user.username === username);
};

const PasswordMatch = async (
  username: string,
  password: string,
): Promise<boolean> => {
  const users = await getUser();
  const user = users.find(
    (user: { username: string; password: string }) =>
      user.username === username,
  );
  return user ? user.password === password : false;
};

export { mockLogin, findUser, UserExist, PasswordMatch };