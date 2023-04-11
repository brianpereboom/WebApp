/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Interest } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function InterestUpdateForm(props) {
  const {
    owner: ownerProp,
    interest: interestModelProp,
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
    topic: "",
    parent: "",
  };
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [topic, setTopic] = React.useState(initialValues.topic);
  const [parent, setParent] = React.useState(initialValues.parent);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = interestRecord
      ? { ...initialValues, ...interestRecord }
      : initialValues;
    setOwner(cleanValues.owner);
    setTopic(cleanValues.topic);
    setParent(cleanValues.parent);
    setErrors({});
  };
  const [interestRecord, setInterestRecord] = React.useState(interestModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = ownerProp
        ? await DataStore.query(Interest, ownerProp)
        : interestModelProp;
      setInterestRecord(record);
    };
    queryData();
  }, [ownerProp, interestModelProp]);
  React.useEffect(resetStateValues, [interestRecord]);
  const validations = {
    owner: [{ type: "Required" }],
    topic: [{ type: "Required" }],
    parent: [],
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
          topic,
          parent,
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
            Interest.copyOf(interestRecord, (updated) => {
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
      {...getOverrideProps(overrides, "InterestUpdateForm")}
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
              topic,
              parent,
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
        label="Topic"
        isRequired={true}
        isReadOnly={false}
        value={topic}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner,
              topic: value,
              parent,
            };
            const result = onChange(modelFields);
            value = result?.topic ?? value;
          }
          if (errors.topic?.hasError) {
            runValidationTasks("topic", value);
          }
          setTopic(value);
        }}
        onBlur={() => runValidationTasks("topic", topic)}
        errorMessage={errors.topic?.errorMessage}
        hasError={errors.topic?.hasError}
        {...getOverrideProps(overrides, "topic")}
      ></TextField>
      <TextField
        label="Parent"
        isRequired={false}
        isReadOnly={false}
        value={parent}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              owner,
              topic,
              parent: value,
            };
            const result = onChange(modelFields);
            value = result?.parent ?? value;
          }
          if (errors.parent?.hasError) {
            runValidationTasks("parent", value);
          }
          setParent(value);
        }}
        onBlur={() => runValidationTasks("parent", parent)}
        errorMessage={errors.parent?.errorMessage}
        hasError={errors.parent?.hasError}
        {...getOverrideProps(overrides, "parent")}
      ></TextField>
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
          isDisabled={!(ownerProp || interestModelProp)}
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
              !(ownerProp || interestModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
