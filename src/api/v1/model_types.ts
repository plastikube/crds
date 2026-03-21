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
} from '@kubernetes/client-node';

import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';

import { StatusReasons } from './enums/index.mjs';

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
  public PersistentVolumeClaim?: V1PersistentVolumeClaimSpec;
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
    this.PersistentVolumeClaim = props?.spec?.PersistentVolumeClaim;
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
    PersistentVolumeClaim: obj.PersistentVolumeClaim,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

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
