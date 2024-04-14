"use client";
import React, { ChangeEvent, Suspense, useEffect } from "react";
import Card from "./ui/card";
import { api } from "~/trpc/react";
import Button from "./ui/button";
import { CaretLeft, CaretRight } from "./icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "lib/utils";

const MAX_PAGE_TO_RENDER = 7;
const Interest = ({ token }: { token: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [activePage, setActivePage] = React.useState<number>(() =>
    parseInt(searchParams.get("page") ?? "1"),
  );
  const interestQuery = api.interest.getInterest.useQuery({ page: activePage });

  const TOTAL_PAGES_TO_RENDER = Math.ceil(
    (interestQuery?.data?.total ?? 1) / 6,
  );

  useEffect(() => {
    router.push(
      pathname + "?" + createQueryString("page", activePage.toString()),
    );
  }, [activePage]);

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const renderPages = () => {
    const pages = [];

    for (
      let i = (Math.ceil(activePage / 7) - 1) * 7 + 1;
      i <=
      Math.min(Math.floor((activePage - 1) / 7) * 7 + 7, TOTAL_PAGES_TO_RENDER);
      i++
    ) {
      pages.push(
        <Button
          key={i}
          variant="icon"
          onClick={() => {
            setActivePage(i);
          }}
          className={cn(
            " text-stone-400 hover:text-black",
            activePage === i ? "text-black" : "",
          )}
        >
          {i}
        </Button>,
      );
    }

    if (TOTAL_PAGES_TO_RENDER - (Math.ceil(activePage / 7) - 1) * 7 + 1 > 7) {
      pages.push(
        <Button
          key={"next"}
          onClick={() => {
            setActivePage((Math.ceil(activePage / 7) - 1) * 7 + 8);
          }}
          className="shrink-0 text-stone-400 hover:text-black"
        >
          ...
        </Button>,
      );
    }
    return pages;
  };

  const { mutate } = api.interest.addInterest.useMutation();
  const { mutate: remove } = api.interest.removeInterest.useMutation();
  const { data } = api.interest.getUserInterest.useQuery({ token });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked) {
      remove({ interest: [event.target.value], token });
    } else {
      mutate({ interest: [event.target.value], token });
    }
  };
  return (
    <Card heading="Please mark your interests!">
      <p className="text-center">We will keep you notified.</p>
      <div className="my-4 flex items-center justify-between">
        <h2 className="font-medium">My saved interests!</h2>
        {!interestQuery.isLoading && (
          <div className=" text-sm  italic text-stone-500">
            Interests :{interestQuery.data?.total}
          </div>
        )}
      </div>
      <div className="h-48">
        {interestQuery.data?.data.map((interest) => {
          const exist = data?.interest.some((i) => i.id === interest.id);
          return (
            <div key={interest.name} className="my-1 flex  items-center gap-2">
              <input
                className="h-4 w-4 cursor-pointer  accent-black"
                id={interest.id.toString()}
                type="checkbox"
                defaultChecked={!!exist}
                value={interest.id}
                onChange={(event) => handleChange(event)}
              />
              <label className="capitalize" htmlFor={interest.id.toString()}>
                {interest.name}
              </label>
            </div>
          );
        })}
        {interestQuery.isLoading && (
          <div className=" animate-pulse text-center text-[20px]">
            Loading Interests ...
          </div>
        )}
      </div>

      <div className="my-4 flex items-center justify-center">
        <Button
          variant="icon"
          className="flex text-stone-400 transition-colors hover:text-black"
          onClick={() => setActivePage(1)}
        >
          <CaretLeft />
          <CaretLeft />
        </Button>
        <Button
          variant="icon"
          className="text-stone-400 transition-colors hover:text-black "
          onClick={() => setActivePage((prv) => (prv === 1 ? 1 : prv - 1))}
        >
          <CaretLeft />
        </Button>
        {renderPages()}
        <Button
          onClick={() => {
            setActivePage((prv) =>
              prv < TOTAL_PAGES_TO_RENDER ? prv + 1 : TOTAL_PAGES_TO_RENDER,
            );
          }}
          variant="icon"
          className="text-stone-400 transition-colors hover:text-black "
        >
          <CaretRight />
        </Button>
        <Button
          variant="icon"
          className="flex text-stone-400 transition-colors hover:text-black"
          onClick={() => setActivePage(TOTAL_PAGES_TO_RENDER)}
        >
          <CaretRight />
          <CaretRight />
        </Button>
      </div>
    </Card>
  );
};

export default Interest;
