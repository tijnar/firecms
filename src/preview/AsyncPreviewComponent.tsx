import * as React from "react";
import { useEffect, useState } from "react";
import { EntitySchema } from "../models";
import { Box, CircularProgress } from "@material-ui/core";

export interface AsyncPreviewComponentProps<S extends EntitySchema> {

    builder: Promise<React.ReactNode>;

}

/**
 * Utility component used to render the result of an async execution.
 * It shows a loading indicator while at it.
 *
 * @param buildComponent that needs to do some async
 * @constructor
 */
export default function AsyncPreviewComponent<S extends EntitySchema>(
    {
        builder
    }: AsyncPreviewComponentProps<S>): JSX.Element {

    const [loading, setLoading] = useState<boolean>(true);
    const [result, setResult] = useState<React.ReactNode>(null);

    useEffect(() => {
        builder
            .then((res) => {
                setLoading(false);
                setResult(res);
            })
            .catch(error => {
                setLoading(false);
                console.error(error);
            });
    }, [builder]);

    if (loading)
        return <Box m="auto" style={{ minWidth: 80 }}>
            <CircularProgress size={24}/>
        </Box>;

    return <React.Fragment>{result}</React.Fragment>;

}
