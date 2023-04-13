/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Event } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function EventUpdateForm(props) {
  const {
    owner: ownerProp,
    event: eventModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    owner: "",
    begin: "",
    end: "",
    location: "",
    minAge: "",
    maxAge: "",
    topics: [],
    rsvps: [],
  };
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [begin, setBegin] = React.useState(initialValues.begin);
  const [end, setEnd] = React.useState(initialValues.end);
  const [location, setLocation] = React.useState(initialValues.location);
  const [minAge, setMinAge] = React.useState(initialValues.minAge);
  const [maxAge, setMaxAge] = React.useState(initialValues.maxAge);
  const [topics, setTopics] = React.useState(initialValues.topics);
  const [rsvps, setRsvps] = React.useState(initialValues.rsvps);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = eventRecord
      ? { ...initialValues, ...eventRecord }
      : initialValues;
    setOwner(cleanValues.owner);
    setBegin(cleanValues.begin);
    setEnd(cleanValues.end);
    setLocation(cleanValues.location);
    setMinAge(cleanValues.minAge);
    setMaxAge(cleanValues.maxAge);
    setTopics(cleanValues.topics ?? []);
    setCurrentTopicsValue("");
    setRsvps(cleanValues.rsvps ?? []);
    setCurrentRsvpsValue("");
    setErrors({});
  };
  const [eventRecord, setEventRecord] = React.useState(eventModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = ownerProp
        ? await DataStore.query(Event, ownerProp)
        : eventModelProp;
      setEventRecord(record);
    };
    queryData();
  }, [ownerProp, eventModelProp]);
  React.useEffect(resetStateValues, [eventRecord]);
  const [currentTopicsValue, setCurrentTopicsValue] = React.useState("");
  const topicsRef = React.createRef();
  const [currentRsvpsValue, setCurrentRsvpsValue] = React.useState("");
  const rsvpsRef = React.createRef();
  const validations = {
    owner: [{ type: "Required" }],
    begin: [{ type: "Required" }],
    end: [{ type: "Required" }],
    location: [{ type: "Required" }],
    minAge: [{ type: "Required" }],
    maxAge: [{ type: "Required" }],
    topics: [{ type: "Required" }],
    rsvps: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          owner,
          begin,
          end,
          location,
          minAge,
          maxAge,
          topics,
          rsvps,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Event.copyOf(eventRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "EventUpdateForm")}
      {...rest}
    >
      <TextField
        label="Owner"
        isRequired={true}
        isReadOnly={true}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner: value,
              begin,
              end,
              location,
              minAge,
              maxAge,
              topics,
              rsvps,
            };
            const result = onChange(modelFields);
            value = result?.owner ?? value;
          }
          if (errors.owner?.hasError) {
            runValidationTasks("owner", value);
          }
          setOwner(value);
        }}
        onBlur={() => runValidationTasks("owner", owner)}
        errorMessage={errors.owner?.errorMessage}
        hasError={errors.owner?.hasError}
        {...getOverrideProps(overrides, "owner")}
      ></TextField>
      <TextField
        label="Begin"
        isRequired={true}
        isReadOnly={false}
        value={begin}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner,
              begin: value,
              end,
              location,
              minAge,
              maxAge,
              topics,
              rsvps,
            };
            const result = onChange(modelFields);
            value = result?.begin ?? value;
          }
          if (errors.begin?.hasError) {
            runValidationTasks("begin", value);
          }
          setBegin(value);
        }}
        onBlur={() => runValidationTasks("begin", begin)}
        errorMessage={errors.begin?.errorMessage}
        hasError={errors.begin?.hasError}
        {...getOverrideProps(overrides, "begin")}
      ></TextField>
      <TextField
        label="End"
        isRequired={true}
        isReadOnly={false}
        value={end}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner,
              begin,
              end: value,
              location,
              minAge,
              maxAge,
              topics,
              rsvps,
            };
            const result = onChange(modelFields);
            value = result?.end ?? value;
          }
          if (errors.end?.hasError) {
            runValidationTasks("end", value);
          }
          setEnd(value);
        }}
        onBlur={() => runValidationTasks("end", end)}
        errorMessage={errors.end?.errorMessage}
        hasError={errors.end?.hasError}
        {...getOverrideProps(overrides, "end")}
      ></TextField>
      <TextField
        label="Location"
        isRequired={true}
        isReadOnly={false}
        value={location}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner,
              begin,
              end,
              location: value,
              minAge,
              maxAge,
              topics,
              rsvps,
            };
            const result = onChange(modelFields);
            value = result?.location ?? value;
          }
          if (errors.location?.hasError) {
            runValidationTasks("location", value);
          }
          setLocation(value);
        }}
        onBlur={() => runValidationTasks("location", location)}
        errorMessage={errors.location?.errorMessage}
        hasError={errors.location?.hasError}
        {...getOverrideProps(overrides, "location")}
      ></TextField>
      <TextField
        label="Min age"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={minAge}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              owner,
              begin,
              end,
              location,
              minAge: value,
              maxAge,
              topics,
              rsvps,
            };
            const result = onChange(modelFields);
            value = result?.minAge ?? value;
          }
          if (errors.minAge?.hasError) {
            runValidationTasks("minAge", value);
          }
          setMinAge(value);
        }}
        onBlur={() => runValidationTasks("minAge", minAge)}
        errorMessage={errors.minAge?.errorMessage}
        hasError={errors.minAge?.hasError}
        {...getOverrideProps(overrides, "minAge")}
      ></TextField>
      <TextField
        label="Max age"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={maxAge}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              owner,
              begin,
              end,
              location,
              minAge,
              maxAge: value,
              topics,
              rsvps,
            };
            const result = onChange(modelFields);
            value = result?.maxAge ?? value;
          }
          if (errors.maxAge?.hasError) {
            runValidationTasks("maxAge", value);
          }
          setMaxAge(value);
        }}
        onBlur={() => runValidationTasks("maxAge", maxAge)}
        errorMessage={errors.maxAge?.errorMessage}
        hasError={errors.maxAge?.hasError}
        {...getOverrideProps(overrides, "maxAge")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              owner,
              begin,
              end,
              location,
              minAge,
              maxAge,
              topics: values,
              rsvps,
            };
            const result = onChange(modelFields);
            values = result?.topics ?? values;
          }
          setTopics(values);
          setCurrentTopicsValue("");
        }}
        currentFieldValue={currentTopicsValue}
        label={"Topics"}
        items={topics}
        hasError={errors?.topics?.hasError}
        errorMessage={errors?.topics?.errorMessage}
        setFieldValue={setCurrentTopicsValue}
        inputFieldRef={topicsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Topics"
          isRequired={true}
          isReadOnly={false}
          value={currentTopicsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.topics?.hasError) {
              runValidationTasks("topics", value);
            }
            setCurrentTopicsValue(value);
          }}
          onBlur={() => runValidationTasks("topics", currentTopicsValue)}
          errorMessage={errors.topics?.errorMessage}
          hasError={errors.topics?.hasError}
          ref={topicsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "topics")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              owner,
              begin,
              end,
              location,
              minAge,
              maxAge,
              topics,
              rsvps: values,
            };
            const result = onChange(modelFields);
            values = result?.rsvps ?? values;
          }
          setRsvps(values);
          setCurrentRsvpsValue("");
        }}
        currentFieldValue={currentRsvpsValue}
        label={"Rsvps"}
        items={rsvps}
        hasError={errors?.rsvps?.hasError}
        errorMessage={errors?.rsvps?.errorMessage}
        setFieldValue={setCurrentRsvpsValue}
        inputFieldRef={rsvpsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Rsvps"
          isRequired={false}
          isReadOnly={false}
          value={currentRsvpsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.rsvps?.hasError) {
              runValidationTasks("rsvps", value);
            }
            setCurrentRsvpsValue(value);
          }}
          onBlur={() => runValidationTasks("rsvps", currentRsvpsValue)}
          errorMessage={errors.rsvps?.errorMessage}
          hasError={errors.rsvps?.hasError}
          ref={rsvpsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "rsvps")}
        ></TextField>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(ownerProp || eventModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(ownerProp || eventModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
