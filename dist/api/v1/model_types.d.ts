import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta, V1PersistentVolumeClaimSpec } from '@kubernetes/client-node';
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
import { StatusReasons } from './enums/index.mjs';
export interface modelResource extends KubernetesObject {
    spec: modelSpec;
    status: modelStatus;
    metadata?: V1ObjectMeta | undefined;
}
export declare class ApiResource implements cdk8splus.IApiResource {
    apiGroup: string;
    resourceType: string;
    /**
     * Return the IApiResource this object represents.
     */
    asApiResource(): cdk8splus.IApiResource | undefined;
    /**
     * Return the non resource url this object represents.
     */
    asNonApiResource(): string | undefined;
}
export declare class model extends ApiObject implements modelSpec {
    PersistentVolumeClaim?: V1PersistentVolumeClaimSpec;
    status?: modelStatus;
    /**
     * Returns the apiVersion and kind for "model"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "model".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: modelProps): unknown;
    /**
     * Defines a "model" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: modelProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): unknown;
}
export interface modelProps {
    readonly metadata?: ApiObjectMetadata;
    readonly spec: modelSpec;
    readonly status?: modelStatus;
}
export declare function toJson_modelProps(obj: modelProps | undefined): Record<string, unknown> | undefined;
export declare function toJson_modelSpec(obj: modelSpec | undefined): Record<string, unknown> | undefined;
export interface modelSpec {
    /**
     * PersistentVolumeClaim defines the PVC configuration for the module
     */
    PersistentVolumeClaim?: V1PersistentVolumeClaimSpec;
}
export interface modelStatus {
    /**
     * lastTransitionTime is the last time the condition transitioned from one status to another. This is not guaranteed to be set in happensBefore order across different conditions for a given object. It may be unset in some circumstances.
     */
    lastTransitionTime: Date;
    /**
     * message is a human readable message indicating details about the transition. This may be an empty string.
     */
    message: string;
    /**
     * reason contains a programmatic identifier indicating the reason for the condition's last transition.
     */
    reason: StatusReasons;
    /**
     * observedGeneration
     */
    observedGeneration?: number;
}
export declare function toJson_modelStatus(obj: modelStatus | undefined): Record<string, unknown> | undefined;
export declare const details: {
    name: string;
    plural: string;
    group: string;
    version: string;
    scope: string;
    shortName: string;
};
