import React from "react";
import Popover from "@mui/material/Popover";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import styles from "./filter.module.css";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 5,
  width: 16,
  height: 16,
  transition: "all 0.35s ease-out",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  border: "2px solid transparent",
  "input:hover ~ &": {
    borderColor: "rgba(16, 46, 161, 0.5)",
    backgroundColor: "rgba(255, 255, 255, 00)",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "var(--brand-color)",
  border: "2px solid var(--brand-color)",
  display: "flex",
  alignItems: "center",
  transition: "all 0.35s ease-out",

  justifyContent: "center",
  "input:hover ~ &": {
    backgroundColor: "#106ba3",
  },
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    backgroundPosition: "center center",
    content: '""',
  },
});

function Filter({ title, items, onChange }) {
  const wrap = items?.length > 8;
  const containerClass = wrap ? "row-cols-2 row-cols-md-3" : "row-cols-1";

  function handleOnChange(e, index) {
    onChange(index, e.target.checked);
  }

  let subtitle = " All";
  const selected = items?.filter((c) => c.isChecked);
  if (selected?.length === 1) {
    subtitle = ` ${selected[0].name}`;
  } else if (selected?.length > 1) {
    subtitle = ` ${selected.length} selected`;
  }

  return (
    <div>
      <PopupState variant="popover" popupId="filter-popover">
        {(popupState) => (
          <div>
            <div
              role="button"
              className={`${styles.dropdown} col`}
              variant="contained"
              {...bindTrigger(popupState)}
            >
              <div className="text-nowrap text-truncate me-1">
                {title}{" "}
                <span className={`${styles.subtitle} ms-1`}>{subtitle}</span>
              </div>
              <i className={`bi bi-caret-down-fill ${styles.icon}`}></i>
            </div>
            <Popover
              id="filter-popover"
              disableScrollLock={true}
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              PaperProps={{
                style: { maxWidth: `412px` },
              }}
            >
              <div
                className={`container-fluid pe-0`}
                style={{ maxWidth: "80vw" }}
              >
                {items && (
                  <div className={`row gx-0 ${containerClass}`}>
                    {items?.map((item, index) => {
                      return (
                        <FormControlLabel
                          key={`${item.name}_${index}`}
                          className={`col ${styles.formControlLabel} text-truncate`}
                          control={
                            <Checkbox
                              disableRipple
                              color="default"
                              checkedIcon={<BpCheckedIcon />}
                              icon={<BpIcon />}
                              checked={item.isChecked}
                              onChange={(e) => handleOnChange(e, index)}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          }
                          label={item.name}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </Popover>
          </div>
        )}
      </PopupState>
    </div>
  );
}

export default Filter;
