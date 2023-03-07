import { Calendar } from "antd";
import { FC } from "react";
import { IEvent } from "../../../models/IEvent";
import type { Dayjs } from "dayjs";
import { dateFormate } from "../../../utils/dateFormate";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import { useTypedSelector } from "../../../hooks/redux";

interface Props {
  events: IEvent[];
}

const EventCalendar: FC<Props> = ({ events }) => {
  const user = useTypedSelector((state) => state.auth.user);
  const dateCellRender = (value: Dayjs) => {
    const formateData = dateFormate(value?.toDate());
    const currrentEvents = events.filter((event) => event.date === formateData);
    return (
      <ul className="events">
        {currrentEvents.map((item, index) =>
          user.username === "admin" ? (
            <li key={index} className="">
              {item.description} ({capitalizeFirstLetter(item.guest)})
            </li>
          ) : (
            <li key={index} className="">
              {item.description}
            </li>
          )
        )}
      </ul>
    );
  };
  return <Calendar dateCellRender={dateCellRender} />;
};
// {guestName !== '' && (
//   capitalizeFirstLetter(guestName)
// )}
export default EventCalendar;
