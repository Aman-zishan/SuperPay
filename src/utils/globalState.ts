import { createContext } from "react";

import type {Framework} from "@superfluid-finance/sdk-core";

const globalContext = createContext<Framework | undefined>(undefined);

export default globalContext;