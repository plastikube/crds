'use strict';

// Kind: resourceprofile
// Group: plastikube
// Version: v1
// Domain: dev

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

export class ApiResource implements cdk8splus.IApiResource {
  apiGroup: string = 'plastikube.dev';
  resourceType: string = 'resourceprofiles';

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

export class resourceprofile extends ApiObject implements resourceprofileSpec {
  public resources?: {
    [key: string]: string;
  };
  public status?: resourceprofileStatus;

  /**
   * Returns the apiVersion and kind for "resourceprofile"
   */
  public static readonly GVK: GroupVersionKind = {
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
  public static manifest(props: resourceprofileProps): unknown {
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
  public constructor(
    scope: Construct,
    id: string,
    props: resourceprofileProps
  ) {
    super(scope, id, {
      ...resourceprofile.GVK,
      ...props,
    });
    this.resources = props?.spec?.resources;
    this.status = props?.status;
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): unknown {
    const resolved = super.toJson();

    return {
      ...resourceprofile.GVK,
      ...toJson_resourceprofileProps(resolved),
    };
  }
}

export interface resourceprofileProps {
  readonly metadata?: ApiObjectMetadata;
  readonly spec: resourceprofileSpec;
  readonly status?: resourceprofileStatus;
}

export function toJson_resourceprofileProps(
  obj: resourceprofileProps | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    metadata: obj.metadata,
    spec: toJson_resourceprofileSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_resourceprofileSpec(
  obj: resourceprofileSpec | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    resources: obj.resources,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export interface resourceprofileSpec {
  /**
   * resources defines the compute resources (CPU, memory, etc.) required for this profile.
   * Keys are resource names (e.g., "cpu", "memory", "nvidia.com/gpu") and values are resource quantities.
   */
  resources?: {
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

export function toJson_resourceprofileStatus(
  obj: resourceprofileStatus | undefined
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
  name: 'resourceprofile',
  plural: 'resourceprofiles',
  group: 'plastikube.dev',
  version: 'v1',
  scope: 'Namespaced',
  shortName: 'resourceprofile',
};
