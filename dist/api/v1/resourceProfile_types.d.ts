import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
export interface resourceprofileResource extends KubernetesObject {
    spec: resourceprofileSpec;
    status: resourceprofileStatus;
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
export declare class resourceprofile extends ApiObject implements resourceprofileSpec {
    requests?: {
        [key: string]: string;
    };
    limits?: {
        [key: string]: string;
    };
    status?: resourceprofileStatus;
    /**
     * Returns the apiVersion and kind for "resourceprofile"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "resourceprofile".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: resourceprofileProps): unknown;
    /**
     * Defines a "resourceprofile" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: resourceprofileProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): unknown;
}
export interface resourceprofileProps {
    readonly metadata?: ApiObjectMetadata;
    readonly spec: resourceprofileSpec;
    readonly status?: resourceprofileStatus;
}
export declare function toJson_resourceprofileProps(obj: resourceprofileProps | undefined): Record<string, unknown> | undefined;
export declare function toJson_resourceprofileSpec(obj: resourceprofileSpec | undefined): Record<string, unknown> | undefined;
export interface resourceprofileSpec {
    /**
     * requests defines the minimum compute resources (CPU, memory, etc.) required for this profile.
     * Keys are resource names (e.g., "cpu", "memory", "nvidia.com/gpu") and values are resource quantities.
     */
    requests?: {
        [key: string]: string;
    };
    /**
     * limits defines the maximum compute resources (CPU, memory, etc.) allowed for this profile.
     * Keys are resource names (e.g., "cpu", "memory", "nvidia.com/gpu") and values are resource quantities.
     */
    limits?: {
        [key: string]: string;
    };
}
export interface resourceprofileStatus {
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
    reason: string;
    /**
     * observedGeneration
     */
    observedGeneration?: number;
}
export declare function toJson_resourceprofileStatus(obj: resourceprofileStatus | undefined): Record<string, unknown> | undefined;
export declare const details: {
    name: string;
    plural: string;
    group: string;
    version: string;
    scope: string;
    shortName: string;
};
