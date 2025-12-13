"use client";
import { ChevronDown } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import Subject from "@/components/skeletons/subject.skeleton";

type SubjectType = {
  _id: string;
  name: string;
  icon: string;
  createdAt?: string;
};

export default function Subjects({ subjects }: { subjects: SubjectType[] }) {
  const ITEMS_PER_LOAD = 4;
  const [data, setData] = useState<SubjectType[]>([]);

  function loadMore() {
    if (data.length >= subjects.length) return;
    setTimeout(() => {
      const nextItems = subjects.slice(
        data.length,
        data.length + ITEMS_PER_LOAD
      );
      setData((prev) => [...prev, ...nextItems]);
    }, 1000);
  }

  useEffect(() => {
    setData(subjects.slice(0, ITEMS_PER_LOAD));
  }, [subjects]);
  return (
    <div>
      <InfiniteScroll
        className="!overflow-visible mb-20 flex gap-7 flex-wrap justify-center"
        dataLength={data.length}
        next={loadMore}
        hasMore={data.length < subjects.length}
        loader={null}
      >
        {data.map((item, i) => (
          <Subject
            key={item.name}
            name={item.name}
            icon={item.icon}
            _id={item._id}
          />
        ))}
      </InfiniteScroll>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center items-center fixed bottom-10 font-mono">
          {subjects.length > data.length && data.length > 0 && (
            <>
              {" "}
              <span>Scroll to view more</span>
              <ChevronDown />
            </>
          )}
        </div>
      </div>
      {subjects.length > data.length && (
        <div className="w-full text-lg text-center font-mono mb-3">
          Loading more subjects...
        </div>
      )}
      {subjects.length === data.length && (
        <div className="w-full text-lg text-center font-mono mb-3">
          There's no more data to view
        </div>
      )}
    </div>
  );
}
