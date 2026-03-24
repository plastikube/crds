import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta, V1EnvVar, V1Toleration, V1SecretKeySelector } from '@kubernetes/client-node';
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
export interface routerResource extends KubernetesObject {
    spec: routerSpec;
    status: routerStatus;
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
export declare class router extends ApiObject implements routerSpec {
    image?: string;
    imagePullSecret?: string;
    env?: V1EnvVar[];
    entrypoint?: string[];
    args?: string[];
    replicas?: number;
    nodeSelector?: {
        [key: string]: string;
    };
    tolerations?: V1Toleration[];
    auth?: {
        users?: Array<{
            ident: string;
            token?: {
                secretKeyRef?: V1SecretKeySelector;
            };
            models?: string[];
        }>;
    };
    models?: Array<{
        model: string;
    }>;
    status?: routerStatus;
    /**
     * Returns the apiVersion and kind for "router"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "router".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: routerProps): unknown;
    /**
     * Defines a "router" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: routerProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): unknown;
}
export interface routerProps {
    readonly metadata?: ApiObjectMetadata;
    readonly spec: routerSpec;
    readonly status?: routerStatus;
}
export declare function toJson_routerProps(obj: routerProps | undefined): Record<string, unknown> | undefined;
export declare function toJson_routerSpec(obj: routerSpec | undefined): Record<string, unknown> | undefined;
export interface routerSpec {
    /**
     * image specifies the container image to use for the router
     */
    image?: string;
    /**
     * imagePullSecret specifies the secret to use for pulling the image
     */
    imagePullSecret?: string;
    /**
     * env specifies extra environment variables to set in the container
     */
    env?: V1EnvVar[];
    /**
     * entrypoint overrides the image entrypoint
     */
    entrypoint?: string[];
    /**
     * args overrides the image args
     */
    args?: string[];
    /**
     * replicas specifies the default number of replicas
     */
    replicas?: number;
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
    /**
     * auth specifies the authentication configuration for the router
     */
    auth?: {
        /**
         * users specifies the list of authorized users
         */
        users?: Array<{
            /**
             * ident specifies the user identifier
             */
            ident: string;
            /**
             * token specifies the authentication token reference
             */
            token?: {
                /**
                 * secretKeyRef references a key in a secret containing the token
                 */
                secretKeyRef?: V1SecretKeySelector;
            };
            /**
             * models specifies the list of models this user can access
             */
            models?: string[];
        }>;
    };
    /**
     * models specifies the list of models served by this router
     */
    models?: Array<{
        /**
         * model specifies the model name
         */
        model: string;
    }>;
}
export interface routerStatus {
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
export declare function toJson_routerStatus(obj: routerStatus | undefined): Record<string, unknown> | undefined;
export declare const details: {
    name: string;
    plural: string;
    group: string;
    version: string;
    scope: string;
    shortName: string;
};
