import { SetupNetworkResult } from "./setupNetwork";
import { ClientComponents } from "./createClientComponents";
import { MoveSystemProps, SystemSigner } from "./types";
import { uuid } from "@latticexyz/utils";
import { Entity, getComponentValue } from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { updatePositionWithDirection } from "./utils";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
    { execute }: SetupNetworkResult,
    { Position }: ClientComponents
) {
    const spawn = async (props: SystemSigner) => {
        console.log(props.signer);
        try {
            await execute(props.signer, "actions", "spawn", []);
        } catch (e) {
            console.error(e);
        }
    };

    const move = async (props: MoveSystemProps) => {
        const { signer, direction } = props;

        try {
            await execute(signer, "actions", "move", [direction]);
        } catch (e) {
            console.log(e);
        }
    };

    return {
        spawn,
        move,
    };
}
