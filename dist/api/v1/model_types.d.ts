import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta, V1PersistentVolumeClaimSpec, V1EnvVar, V1Toleration, V1PodSecurityContext } from '@kubernetes/client-node';
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
import { StatusReasons, DownloadTypes } from './enums/index.mjs';
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
    image?: string;
    imagePullSecret?: string;
    modelStorage?: {
        PersistentVolumeClaim?: V1PersistentVolumeClaimSpec;
        existingVolume?: string;
        path?: string;
        download?: {
            type?: DownloadTypes;
            source?: string;
            job?: {
                image?: string;
                imagePullSecret?: string;
                entrypoint?: string[];
                args?: string[];
                env?: V1EnvVar[];
                securityContext?: V1PodSecurityContext;
            };
        };
    };
    engine?: string;
    features?: string[];
    resourceProfile?: string;
    entrypoint?: string[];
    args?: string[];
    env?: V1EnvVar[];
    replicas?: number;
    autoscaling?: {
        minReplicas?: number;
        maxReplicas?: number;
        idleScaleDown?: number;
        busyScaleUp?: {
            bucket: number;
            activePercent: number;
        };
    };
    nodeSelector?: {
        [key: string]: string;
    };
    tolerations?: V1Toleration[];
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
     * image specifies the container image to use for the model
     */
    image?: string;
    /**
     * imagePullSecret specifies the secret to use for pulling the image
     */
    imagePullSecret?: string;
    /**
     * modelStorage defines the storage configuration for the model
     */
    modelStorage?: {
        /**
         * PersistentVolumeClaim defines a new PVC to create for storing the model
         */
        PersistentVolumeClaim?: V1PersistentVolumeClaimSpec;
        /**
         * existingVolume references an existing PVC to use for storing the model
         */
        existingVolume?: string;
        /**
         * path specifies the path within the PVC to load the model from
         */
        path?: string;
        /**
         * download specifies how to download the model
         */
        download?: {
            /**
             * type specifies the download type
             */
            type?: DownloadTypes;
            /**
             * source specifies the download source URL / huggingface repo/filename
             */
            source?: string;
            /**
             * job specifies the configuration for the download job
             */
            job?: {
                /**
                 * image specifies the container image to use for downloading the model
                 */
                image?: string;
                /**
                 * imagePullSecret specifies the secret to use for pulling the downloader image
                 */
                imagePullSecret?: string;
                /**
                 * entrypoint overrides the image entrypoint for the downloader
                 */
                entrypoint?: string[];
                /**
                 * args overrides the image args for the downloader
                 */
                args?: string[];
                /**
                 * env specifies extra environment variables to set in the downloader container
                 */
                env?: V1EnvVar[];
                /**
                 * securityContext specifies security settings for the downloader pod
                 */
                securityContext?: V1PodSecurityContext;
            };
        };
    };
    /**
     * engine specifies the model engine to use
     */
    engine?: string;
    /**
     * features specifies the model features
     */
    features?: string[];
    /**
     * resourceProfile specifies the resource profile to reference for this model.
     * This is a reference to a predefined resource profile that defines CPU, memory,
     * and other node resources needed for the model.
     */
    resourceProfile?: string;
    /**
     * entrypoint overrides the image entrypoint
     */
    entrypoint?: string[];
    /**
     * args overrides the image args
     */
    args?: string[];
    /**
     * env specifies extra environment variables to set in the container
     */
    env?: V1EnvVar[];
    /**
     * replicas specifies the default number of replicas
     */
    replicas?: number;
    /**
     * autoscaling specifies the autoscaling configuration
     */
    autoscaling?: {
        /**
         * minReplicas specifies the minimum replicas when autoscaling is enabled
         */
        minReplicas?: number;
        /**
         * maxReplicas specifies the maximum replicas when autoscaling is enabled
         */
        maxReplicas?: number;
        /**
         * idleScaleDown specifies seconds model can be idle before we scale to minReplicas
         */
        idleScaleDown?: number;
        /**
         * busyScaleUp specifies the scale-up configuration
         */
        busyScaleUp?: {
            /**
             * bucket specifies seconds to size the bucket
             */
            bucket: number;
            /**
             * activePercent specifies percentage of the bucket we have to be busy to trigger scaling up
             */
            activePercent: number;
        };
    };
    /**
     * nodeSelector specifies node labels for pod assignment.
     * Each key-value pair represents a label that must be present on a node for the pod to be scheduled there.
     */
    nodeSelector?: {
        [key: string]: string;
    };
    /**
     * tolerations specify the taints that the pod can tolerate.
     */
    tolerations?: V1Toleration[];
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
