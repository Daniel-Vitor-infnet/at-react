import { DateTimePicker, Grid, TextField, Button } from "../../index";
import { useAppContext } from "../../../Context";
import { handleInputChange } from "../../../utils/function/handleInputChange";
import { adjustDateTimeForTimezone, selectItem } from "../../../utils/function"
import { useEffect } from "react";

const Eat = ({ data, setData }) => {
  useEffect(() => {
    setData({ ...data, 'action_type': 2 });
  }, []);


  const { translate } = useAppContext();
  return (
    <Grid container={true} spacing={2}>
      <Grid item={true} size={{ xs: 12 }}>
        <Button
          color={data.type === 1 ? "secondary" : "primary"}
          onClick={() => {
            handleInputChange("side", null, data, setData);
            handleInputChange("end_date", null, data, setData);
            selectItem(1, "type", data, setData);
          }}
        >
          {translate("eat-bottle")}
        </Button>
        <Button
          color={data.type === 2 ? "secondary" : "primary"}
          onClick={() => {
            handleInputChange("quantity", null, data, setData);
            selectItem(2, "type", data, setData);
          }}
        >
          {translate("eat-bosom")}
        </Button>
      </Grid>

      {
        data.type === 1 ? <Grid item={true} size={{ xs: 12 }}>
          <TextField
            value={data?.quantity ? data.quantity : ""}
            label={translate("quantity")}
            onChange={(event) =>
              handleInputChange('quantity', event.target.value, data, setData)
            }
            name="quantity"
            rows={6}
            type="(number)"
            fullWidth={true}
          />
        </Grid> :
          <Grid item={true} size={{ xs: 12 }}>
            <Button color={data.side === 1 ? "secondary" : "primary"} onClick={() => { selectItem(1, "side", data, setData) }}>{translate("left")}</Button>
            <Button color={data.side === 2 ? "secondary" : "primary"} onClick={() => { selectItem(2, "side", data, setData) }}>{translate("right")}</Button>
            <Button color={data.side === 3 ? "secondary" : "primary"} onClick={() => { selectItem(3, "side", data, setData) }}>{translate("both")}</Button>
          </Grid>
      }

      <Grid item={true} size={{ xs: 12 }}>
        <DateTimePicker
          name="start_date"
          value={data?.start_date ? adjustDateTimeForTimezone(data?.start_date) : null}
          label={data.type === 1 ? translate("data-hour") : translate("data-hour-start")}
          ampm={false}
          format="DD/MM/YYYY HH:mm"
          fullWidth={true}
          onChange={(value) => {
            handleInputChange('start_date', new Date(value.toString()), data, setData);
          }}

        />
      </Grid>
      {
        data.type === 2 ?
          <Grid item={true} size={{ xs: 12 }}>
            <DateTimePicker
              value={data?.end_date ? adjustDateTimeForTimezone(data?.end_date) : null}
              label={translate("data-hour-end")}
              name="end_date"
              fullWidth={true}
              ampm={false}
              format="DD/MM/YYYY HH:mm"
              onChange={(value) =>
                handleInputChange('end_date', new Date(value.toString()), data, setData)
              }
            />
          </Grid> : null
      }


      <Grid item={true} size={{ xs: 12 }}>
        <TextField
          value={data?.observation ? data.observation : ""}
          label={translate("observation")}
          onChange={(event) =>
            handleInputChange('observation', event.target.value, data, setData)
          }
          name="observation"
          rows={6}
          fullWidth={true}
          multiline={true}
        />
      </Grid>
    </Grid>
  );
};

export default Eat;
