'use strict';

// Kind: model
// Group: plastikube
// Version: v1
// Domain: dev

import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import {
  V1ObjectMeta,
  V1PersistentVolumeClaimSpec,
  V1EnvVar,
  V1Toleration,
  V1PodSecurityContext,
} from '@kubernetes/client-node';

import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';

import {
  StatusReasons,
  DownloadTypes,
  EngineTypes,
  DefaultDownloaderImage,
} from './enums/index.mjs';

export interface modelResource extends KubernetesObject {
  spec: modelSpec;
  status: modelStatus;
  metadata?: V1ObjectMeta | undefined;
}

export class ApiResource implements cdk8splus.IApiResource {
  apiGroup: string = 'plastikube.dev';
  resourceType: string = 'models';

  /**
   * Return the IApiResource this object represents.
   */
  public asApiResource(): cdk8splus.IApiResource | undefined {
    return this;
  }

  /**
   * Return the non resource url this object represents.
   */
  public asNonApiResource(): string | undefined {
    return undefined;
  }
}

export class model extends ApiObject implements modelSpec {
  public enabled?: boolean;
  public image?: string;
  public imagePullSecret?: string;
  public modelStorage?: {
    persistentVolumeClaim?: V1PersistentVolumeClaimSpec;
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
  public engine?: EngineTypes;
  public features?: string[];
  public resourceProfile?: string;
  public entrypoint?: string[];
  public args?: string[];
  public env?: V1EnvVar[];
  public replicas?: number;
  public autoscaling?: {
    minReplicas?: number;
    maxReplicas?: number;
    idleScaleDown?: number;
    busyScaleUp?: {
      bucket: number;
      activePercent: number;
    };
  };
  public nodeSelector?: {
    [key: string]: string;
  };
  public tolerations?: V1Toleration[];
  public status?: modelStatus;

  /**
   * Returns the apiVersion and kind for "model"
   */
  public static readonly GVK: GroupVersionKind = {
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
  public static manifest(props: modelProps): unknown {
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
  public constructor(scope: Construct, id: string, props: modelProps) {
    super(scope, id, {
      ...model.GVK,
      ...props,
    });
    this.enabled = props?.spec?.enabled;
    this.image = props?.spec?.image;
    this.imagePullSecret = props?.spec?.imagePullSecret;
    this.modelStorage = props?.spec?.modelStorage;

    // Set default downloader image if download job is configured but no image is specified
    if (
      this.modelStorage?.download?.job &&
      !this.modelStorage.download.job.image
    ) {
      this.modelStorage.download.job.image = DefaultDownloaderImage;
    }

    this.engine = props?.spec?.engine;
    this.features = props?.spec?.features;
    this.resourceProfile = props?.spec?.resourceProfile;
    this.entrypoint = props?.spec?.entrypoint;
    this.args = props?.spec?.args;
    this.env = props?.spec?.env;
    this.replicas = props?.spec?.replicas;
    this.autoscaling = props?.spec?.autoscaling;
    this.nodeSelector = props?.spec?.nodeSelector;
    this.tolerations = props?.spec?.tolerations;
    this.status = props?.status;
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): unknown {
    const resolved = super.toJson();

    return {
      ...model.GVK,
      ...toJson_modelProps(resolved),
    };
  }
}

export interface modelProps {
  readonly metadata?: ApiObjectMetadata;
  readonly spec: modelSpec;
  readonly status?: modelStatus;
}

export function toJson_modelProps(
  obj: modelProps | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    metadata: obj.metadata,
    spec: toJson_modelSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_modelSpec(
  obj: modelSpec | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    enabled: obj.enabled,
    image: obj.image,
    imagePullSecret: obj.imagePullSecret,
    modelStorage: obj.modelStorage,
    engine: obj.engine,
    features: obj.features,
    resourceProfile: obj.resourceProfile,
    entrypoint: obj.entrypoint,
    args: obj.args,
    env: obj.env,
    replicas: obj.replicas,
    autoscaling: obj.autoscaling,
    nodeSelector: obj.nodeSelector,
    tolerations: obj.tolerations,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export interface modelSpec {
  /**
   * enabled specifies whether the model is enabled
   */
  enabled?: boolean;

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
     * persistentVolumeClaim defines a new PVC to create for storing the model
     */
    persistentVolumeClaim?: V1PersistentVolumeClaimSpec;

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
  engine?: EngineTypes;

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

export function toJson_modelStatus(
  obj: modelStatus | undefined
): Record<string, unknown> | undefined {
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
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export const details = {
  name: 'model',
  plural: 'models',
  group: 'plastikube.dev',
  version: 'v1',
  scope: 'Namespaced',
  shortName: 'model',
};
