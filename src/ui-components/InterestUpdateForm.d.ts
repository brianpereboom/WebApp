/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Interest } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type InterestUpdateFormInputValues = {
    owner?: string;
    topic?: string;
    parent?: string;
};
export declare type InterestUpdateFormValidationValues = {
    owner?: ValidationFunction<string>;
    topic?: ValidationFunction<string>;
    parent?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type InterestUpdateFormOverridesProps = {
    InterestUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    topic?: PrimitiveOverrideProps<TextFieldProps>;
    parent?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type InterestUpdateFormProps = React.PropsWithChildren<{
    overrides?: InterestUpdateFormOverridesProps | undefined | null;
} & {
    owner?: string;
    interest?: Interest;
    onSubmit?: (fields: InterestUpdateFormInputValues) => InterestUpdateFormInputValues;
    onSuccess?: (fields: InterestUpdateFormInputValues) => void;
    onError?: (fields: InterestUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: InterestUpdateFormInputValues) => InterestUpdateFormInputValues;
    onValidate?: InterestUpdateFormValidationValues;
} & React.CSSProperties>;
export default function InterestUpdateForm(props: InterestUpdateFormProps): React.ReactElement;
