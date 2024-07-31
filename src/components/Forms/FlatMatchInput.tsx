import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: SxProps;
};

const FlatMatchInput = ({
  name,
  label,
  type = "text",
  fullWidth,
  size,
  sx,
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          fullWidth={fullWidth}
          variant="outlined"
          size={size}
          sx={sx}
        />
      )}
    />
  );
};

export default FlatMatchInput;
