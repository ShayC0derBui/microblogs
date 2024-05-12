"use client";
import { useEffect, useState, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import UserCard from "@/components/user-card";
import axios from "axios";

const PAGE_SIZE = 5;

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  bio: string;
}

interface Page {
  users: User[];
  nextCursor: string | null;
}

const fetchUsers = async ({ pageParam = undefined }) => {
  const url = pageParam ? `/api/users?cursor=${pageParam}` : "/api/users";
  console.log(url);
  const response = await axios.get(url);
  console.log(response.data);
  return response.data;
};

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const prevUsers = useRef<User[]>([]);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: fetchUsers,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      initialPageParam: undefined,
    });

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    if (observer.current) {
      observer.current.observe(document.querySelector("#last-user")!);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (data) {
      const newUsers = data.pages.flatMap((page) => page.users);
      setUsers((prevUsers) => [...prevUsers, ...newUsers]);
      prevUsers.current = [...prevUsers.current, ...newUsers];
      console.log(data);
    }
  }, [data]);

  return (
    <div>
      <h1 className="bg-green-300 h-10 flex items-center justify-center text-xl mb-4 font-bold text-center text-black rounded-lg border-black">
        Users
      </h1>
      <div className="overflow-y-scroll">
        <ul>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
          <li id="last-user" style={{ height: "1px", visibility: "hidden" }} />
        </ul>
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </div>
  );
};

export default UsersPage;
