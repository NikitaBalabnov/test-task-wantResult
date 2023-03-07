import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import { FC } from "react";
import { IEvent } from "../../../models/IEvent";
import { IUser } from "../../../models/IUsers";
import { fromRules } from "../../../utils/LoginFormRules";
import { dateFormate } from "../../../utils/dateFormate";
import { useTypedSelector } from "../../../hooks/redux";
import type { Dayjs } from "dayjs";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
const { TextArea } = Input;
interface Props {
  guests: IUser[];
  hendleSunmit: (data: IEvent) => void;
  event: IEvent;
  setEvent: (data: IEvent) => void;
  currentFormatedDate: string;
}

const EventForm: FC<Props> = ({
  guests,
  hendleSunmit,
  event,
  setEvent,
  currentFormatedDate,
}) => {
  const options = guests
    .filter((guest) => guest.username !== "admin")
    .map((guest) => ({
      value: guest.username.toLowerCase(),
      label: capitalizeFirstLetter(guest.username),
    }));
  const { username } = useTypedSelector((state) => state.auth.user);

  const selectedDate = (data: Dayjs | null) => {
    if (data) {
      setEvent({ ...event, date: dateFormate(data?.toDate()) });
    }
  };

  return (
    <Form
      className="event-form"
      name="basic"
      wrapperCol={{ span: 14 }}
      initialValues={{ remember: true }}
      onFinish={() => hendleSunmit({ ...event, author: username })}
      autoComplete="off"
    >
      <Form.Item
        label="Description"
        name="description"
        rules={[fromRules.required()]}
      >
        <TextArea
          rows={4}
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        label="Pick date"
        name="datapick"
        rules={[fromRules.required()]}
      >
        <DatePicker
          style={{ width: "105.5%" }}
          onChange={(date) => selectedDate(date)}
          disabledDate={(currentDate) =>
            currentDate.isBefore(currentFormatedDate, "day")
          }
        />
      </Form.Item>
      <Form.Item
        label="Set Guests"
        name="setguests"
        rules={[fromRules.required()]}
      >
        <Select
          onChange={(guest) => setEvent({ ...event, guest: guest })}
          defaultValue="default"
          style={{ width: "102%" }}
          options={[
            {
              value: "default",
              label: "Pick a Guest",
              disabled: true,
            },
            ...options,
          ]}
        />
      </Form.Item>
      <Form.Item>
        <Row justify="end">
          <Button htmlType="submit">Add event</Button>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default EventForm;
