import React from "react";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input id={"row-checkbox-" +rest.id} type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
);

export {IndeterminateCheckbox}