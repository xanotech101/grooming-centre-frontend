import { render, screen } from "@testing-library/react";
import { EventListing } from "..";

describe("EventListing", () => {
  test("given isLoading prop, then displayed a Loader", () => {
    render(<EventListing isLoading />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  test("given hasError prop, then displayed an errorMessage", () => {
    render(<EventListing hasError />);

    expect(
      screen.getByRole("heading", { name: /something went wrong/i })
    ).toBeInTheDocument();
  });

  test("given eventsIsEmpty prop, then displayed an EmptyState UI", () => {
    render(<EventListing eventsIsEmpty />);

    expect(
      screen.getByRole("heading", { name: /No Upcoming Events/i })
    ).toBeInTheDocument();
  });

  test("given events prop, then displayed a list of events", () => {
    const events = [
      {
        id: "eventId_2",
        startTime: new Date(Date.now() - 60 * 20 * 1000).toISOString(),
        endTime: new Date(Date.now() - 60 * 1 * 1000).toISOString(),
        name: "Event 1",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
      },
      {
        id: "eventId_1",
        startTime: new Date(Date.now() - 60 * 20 * 1000).toISOString(),
        endTime: new Date(Date.now() - 60 * 1 * 1000).toISOString(),
        name: "Event 2",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
      },
    ];
    render(<EventListing events={events} />);

    expect(
      screen.getByTestId("event-list", { name: /No Upcoming Events/i })
    ).toBeInTheDocument();

    const eventItems = screen.getAllByTestId("event-item", {
      name: /No Upcoming Events/i,
    });
    const firstEventItem = eventItems[0];
    const secondEventItem = eventItems[2];

    expect(eventItems.length).toBe(2);
    expect(firstEventItem.innerHTML).toContain("Event 1");
    expect(secondEventItem.innerHTML).toContain("Event 2");
  });
});
