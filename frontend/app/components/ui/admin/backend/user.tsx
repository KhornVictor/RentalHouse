"use client";

type User = {
  userid: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  role: string;
  phonenumber: string;
  avatar: string;
  email: string;
  status: string;
};

const matchesCondition = (user: User): boolean => {
  return true;
};

const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch("/data/users.json");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const users = (await response.json()) as User[];
    return users.filter(matchesCondition);
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

const getTenants = async (): Promise<User[]> => {
  try {
    const response = await fetch("/data/users.json");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const users = (await response.json()) as User[];
    return users.filter((user) => user.role === "tenant");
  } catch (error) {
    console.error("Error fetching tenants:", error);
    return [];
  }
};

const getTotalTenants = async (): Promise<number> => {
  try {
    return (await getTenants()).length;
  } catch (error) {
    console.error("Error fetching total tenants:", error);
    return 0;
  }
};

const getTotalPaidTenants = async (): Promise<number> => {
  try {
    const tenants = await getTenants();
    return tenants.filter((tenant) => tenant.status === "paid").length;
  } catch (error) {
    console.error("Error fetching total paid tenants:", error);
    return 0;
  }
};

export { getUsers, getTenants, getTotalTenants, getTotalPaidTenants };
