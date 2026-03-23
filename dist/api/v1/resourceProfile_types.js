'use strict';
import { ApiObject } from 'cdk8s';
export class ApiResource {
    apiGroup = 'plastikube.dev';
    resourceType = 'resourceprofiles';
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
export class resourceprofile extends ApiObject {
    requests;
    limits;
    status;
    /**
     * Returns the apiVersion and kind for "resourceprofile"
     */
    static GVK = {
        apiVersion: 'plastikube.dev/v1',
        kind: 'resourceprofiles',
    };
    /**
     * Renders a Kubernetes manifest for "resourceprofile".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...resourceprofile.GVK,
            ...toJson_resourceprofileProps(props),
        };
    }
    /**
     * Defines a "resourceprofile" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...resourceprofile.GVK,
            ...props,
        });
        this.requests = props?.spec?.requests;
        this.limits = props?.spec?.limits;
        this.status = props?.status;
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...resourceprofile.GVK,
            ...toJson_resourceprofileProps(resolved),
        };
    }
}
export function toJson_resourceprofileProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: obj.metadata,
        spec: toJson_resourceprofileSpec(obj.spec),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_resourceprofileSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        requests: obj.requests,
        limits: obj.limits,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_resourceprofileStatus(obj) {
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
    name: 'resourceprofile',
    plural: 'resourceprofiles',
    group: 'plastikube.dev',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'resourceprofile',
};
