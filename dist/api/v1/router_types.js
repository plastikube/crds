'use strict';
import { ApiObject } from 'cdk8s';
export class ApiResource {
    apiGroup = 'plastikube.dev';
    resourceType = 'routers';
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
export class router extends ApiObject {
    enabled;
    image;
    imagePullSecret;
    env;
    entrypoint;
    args;
    replicas;
    nodeSelector;
    tolerations;
    auth;
    models;
    ingress;
    service;
    status;
    /**
     * Returns the apiVersion and kind for "router"
     */
    static GVK = {
        apiVersion: 'plastikube.dev/v1',
        kind: 'routers',
    };
    /**
     * Renders a Kubernetes manifest for "router".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...router.GVK,
            ...toJson_routerProps(props),
        };
    }
    /**
     * Defines a "router" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...router.GVK,
            ...props,
        });
        this.enabled = props?.spec?.enabled;
        this.image = props?.spec?.image;
        this.imagePullSecret = props?.spec?.imagePullSecret;
        this.env = props?.spec?.env;
        this.entrypoint = props?.spec?.entrypoint;
        this.args = props?.spec?.args;
        this.replicas = props?.spec?.replicas;
        this.nodeSelector = props?.spec?.nodeSelector;
        this.tolerations = props?.spec?.tolerations;
        this.auth = props?.spec?.auth;
        this.models = props?.spec?.models;
        this.ingress = props?.spec?.ingress;
        this.status = props?.status;
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...router.GVK,
            ...toJson_routerProps(resolved),
        };
    }
}
export function toJson_routerProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: obj.metadata,
        spec: toJson_routerSpec(obj.spec),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_routerSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        enabled: obj.enabled,
        image: obj.image,
        imagePullSecret: obj.imagePullSecret,
        env: obj.env,
        entrypoint: obj.entrypoint,
        args: obj.args,
        replicas: obj.replicas,
        nodeSelector: obj.nodeSelector,
        tolerations: obj.tolerations,
        auth: obj.auth,
        models: obj.models,
        ingress: obj.ingress
            ? {
                enabled: obj.ingress.enabled,
                ingressClassName: obj.ingress.ingressClassName,
                hosts: obj.ingress.hosts,
                tls: obj.ingress.tls,
                annotations: obj.ingress.annotations,
            }
            : undefined,
        service: obj.service,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_routerStatus(obj) {
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
    name: 'router',
    plural: 'routers',
    group: 'plastikube.dev',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'router',
};
