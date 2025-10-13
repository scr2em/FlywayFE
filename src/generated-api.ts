/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** Invitation status */
export type InvitationStatusEnum =
  | "pending"
  | "accepted"
  | "rejected"
  | "expired";

/** User account status */
export type UserStatusEnum = "active" | "inactive" | "pending" | "suspended";

/** Request to register a new user */
export interface UserRegistrationRequest {
  /**
   * User's email address
   * @format email
   */
  email: string;
  /**
   * User's password (minimum 8 characters)
   * @format password
   * @minLength 8
   */
  password: string;
  /** User's first name */
  firstName: string;
  /** User's last name */
  lastName: string;
}

/** Request to login */
export interface LoginRequest {
  /**
   * User's email address
   * @format email
   */
  email: string;
  /**
   * User's password
   * @format password
   */
  password: string;
}

/** Request to refresh access token */
export interface RefreshTokenRequest {
  /** Refresh token */
  refreshToken: string;
}

/** Request to create a new organization */
export interface CreateOrganizationRequest {
  /** Organization name */
  name: string;
  /** Organization description */
  description?: string;
}

/** Request to update an organization */
export interface UpdateOrganizationRequest {
  /** Organization name */
  name?: string;
  /** Organization description */
  description?: string;
}

/** Request to create a new role */
export interface CreateRoleRequest {
  /** Role name */
  name: string;
  /** Role description */
  description?: string;
  /** Organization ID */
  organizationId: string;
  /** List of permission IDs */
  permissionIds?: string[];
}

/** Request to update a role */
export interface UpdateRoleRequest {
  /** Role name */
  name?: string;
  /** Role description */
  description?: string;
  /** List of permission IDs */
  permissionIds?: string[];
}

/** Request to create an invitation */
export interface CreateInvitationRequest {
  /**
   * Email of the invited user
   * @format email
   */
  email: string;
  /** Organization ID */
  organizationId: string;
  /** Role ID */
  roleId: string;
}

/** Request to respond to an invitation */
export interface RespondToInvitationRequest {
  /** Whether to accept or reject the invitation */
  accept: boolean;
}

/** Request to add a member to an organization */
export interface AddOrganizationMemberRequest {
  /** User ID */
  userId: string;
  /** Role ID */
  roleId: string;
}

/** Request to update a member's role */
export interface UpdateMemberRoleRequest {
  /** New role ID */
  roleId: string;
}

/** Request to update user information */
export interface UpdateUserRequest {
  /** User's first name */
  firstName?: string;
  /** User's last name */
  lastName?: string;
  /**
   * User's email address
   * @format email
   */
  email?: string;
}

/** User information */
export interface UserResponse {
  /** User ID */
  id: string;
  /**
   * User's email address
   * @format email
   */
  email: string;
  /** User's first name */
  firstName: string;
  /** User's last name */
  lastName: string;
  /** User status information */
  status: UserStatusResponse;
  /** Organization information (null if user is not in an organization) */
  organization?: UserOrganizationResponse | null;
  /**
   * When the user was created
   * @format date-time
   */
  createdAt: string;
  /**
   * When the user was last updated
   * @format date-time
   */
  updatedAt?: string;
}

/** Minimal organization information for user response */
export interface UserOrganizationResponse {
  /** Organization ID */
  id: string;
  /** Organization name */
  name: string;
}

/** User status information */
export interface UserStatusResponse {
  /** Status ID */
  id: string;
  /** User account status */
  status: UserStatusEnum;
}

/** Authentication response */
export interface AuthResponse {
  /** JWT access token */
  accessToken: string;
  /** Refresh token */
  refreshToken: string;
  /** User information */
  user: UserResponse;
}

/** Refresh token response */
export interface RefreshTokenResponse {
  /** New JWT access token */
  accessToken: string;
  /** New refresh token */
  refreshToken: string;
}

/** Organization information */
export interface OrganizationResponse {
  /** Organization ID */
  id: string;
  /** Organization name */
  name: string;
  /** Organization description */
  description?: string;
  /**
   * When the organization was created
   * @format date-time
   */
  createdAt: string;
  /**
   * When the organization was last updated
   * @format date-time
   */
  updatedAt?: string;
}

/** Role information */
export interface RoleResponse {
  /** Role ID */
  id: string;
  /** Role name */
  name: string;
  /** Role description */
  description?: string;
  /** Organization ID */
  organizationId: string;
  /** List of permissions */
  permissions?: PermissionResponse[];
  /**
   * When the role was created
   * @format date-time
   */
  createdAt: string;
  /**
   * When the role was last updated
   * @format date-time
   */
  updatedAt?: string;
}

/** Permission information */
export interface PermissionResponse {
  /** Permission ID */
  id: string;
  /** Permission name */
  name: string;
  /** Permission description */
  description?: string;
  /** Resource name */
  resource: string;
  /** Action name */
  action: string;
}

/** Invitation information */
export interface InvitationResponse {
  /** Invitation ID */
  id: string;
  /**
   * Email of the invited user
   * @format email
   */
  email: string;
  /** Organization information */
  organization: OrganizationResponse;
  /** Role information */
  role: RoleResponse;
  /** Invitation status information */
  status: InvitationStatusResponse;
  /** User information */
  invitedBy?: UserResponse;
  /**
   * When the invitation was created
   * @format date-time
   */
  createdAt: string;
  /**
   * When the invitation expires
   * @format date-time
   */
  expiresAt?: string;
}

/** Invitation status information */
export interface InvitationStatusResponse {
  /** Status ID */
  id: string;
  /** Invitation status */
  status: InvitationStatusEnum;
}

/** Organization member information */
export interface OrganizationMemberResponse {
  /** Member ID */
  id: string;
  /** User information */
  user: UserResponse;
  /** Role information */
  role: RoleResponse;
  /**
   * When the member joined
   * @format date-time
   */
  joinedAt: string;
}

/** Error response */
export interface ErrorResponse {
  /** Error type */
  error: string;
  /** Error message */
  message: string;
  /** Error details */
  details?: string;
  /**
   * When the error occurred
   * @format date-time
   */
  timestamp?: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://localhost:8080",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Flyway API
 * @version 1.0.0
 * @baseUrl http://localhost:8080
 *
 * API for Flyway application
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags Authentication
     * @name Register
     * @summary Register a new user
     * @request POST:/auth/register
     */
    register: (data: UserRegistrationRequest, params: RequestParams = {}) =>
      this.request<AuthResponse, ErrorResponse>({
        path: `/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name Login
     * @summary Login user
     * @request POST:/auth/login
     */
    login: (data: LoginRequest, params: RequestParams = {}) =>
      this.request<AuthResponse, ErrorResponse>({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name RefreshToken
     * @summary Refresh access token
     * @request POST:/auth/refresh
     */
    refreshToken: (data: RefreshTokenRequest, params: RequestParams = {}) =>
      this.request<RefreshTokenResponse, ErrorResponse>({
        path: `/auth/refresh`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags Users
     * @name GetCurrentUser
     * @summary Get current user information
     * @request GET:/users/me
     * @secure
     */
    getCurrentUser: (params: RequestParams = {}) =>
      this.request<UserResponse, ErrorResponse>({
        path: `/users/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UpdateCurrentUser
     * @summary Update current user information
     * @request PUT:/users/me
     * @secure
     */
    updateCurrentUser: (data: UpdateUserRequest, params: RequestParams = {}) =>
      this.request<UserResponse, ErrorResponse>({
        path: `/users/me`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  organizations = {
    /**
     * No description
     *
     * @tags Organizations
     * @name CreateOrganization
     * @summary Create a new organization
     * @request POST:/organizations
     * @secure
     */
    createOrganization: (
      data: CreateOrganizationRequest,
      params: RequestParams = {},
    ) =>
      this.request<OrganizationResponse, ErrorResponse>({
        path: `/organizations`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organizations
     * @name GetOrganization
     * @summary Get organization by ID
     * @request GET:/organizations/{id}
     * @secure
     */
    getOrganization: (id: string, params: RequestParams = {}) =>
      this.request<OrganizationResponse, ErrorResponse>({
        path: `/organizations/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organizations
     * @name UpdateOrganization
     * @summary Update organization
     * @request PUT:/organizations/{id}
     * @secure
     */
    updateOrganization: (
      id: string,
      data: UpdateOrganizationRequest,
      params: RequestParams = {},
    ) =>
      this.request<OrganizationResponse, ErrorResponse>({
        path: `/organizations/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
