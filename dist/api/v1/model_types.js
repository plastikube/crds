'use strict';
import { ApiObject } from 'cdk8s';
export class ApiResource {
    apiGroup = 'plastikube.dev';
    resourceType = 'models';
    /**
     * Return the IApiResource this object represents.
     */
    asApiResource() {
        return this;
    }
    /**
     * Return the non resource url this object represents.
     */
    asNonApiResource() {
        return undefined;
    }
}
export class model extends ApiObject {
    modelStorage;
    status;
    /**
     * Returns the apiVersion and kind for "model"
     */
    static GVK = {
        apiVersion: 'plastikube.dev/v1',
        kind: 'models',
    };
    /**
     * Renders a Kubernetes manifest for "model".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...model.GVK,
            ...toJson_modelProps(props),
        };
    }
    /**
     * Defines a "model" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...model.GVK,
            ...props,
        });
        this.modelStorage = props?.spec?.modelStorage;
        this.status = props?.status;
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...model.GVK,
            ...toJson_modelProps(resolved),
        };
    }
}
export function toJson_modelProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: obj.metadata,
        spec: toJson_modelSpec(obj.spec),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_modelSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        modelStorage: obj.modelStorage,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_modelStatus(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        lastTransitionTime: obj.lastTransitionTime,
        message: obj.message,
        reason: obj.reason,
        observedGeneration: obj.observedGeneration,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export const details = {
    name: 'model',
    plural: 'models',
    group: 'plastikube.dev',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'model',
};
