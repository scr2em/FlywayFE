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

/** Request to create an invitation */
export interface CreateInvitationRequest {
  /** First name of the invited user */
  firstName: string;
  /** Last name of the invited user */
  lastName: string;
  /**
   * Email of the invited user
   * @format email
   */
  email: string;
  /** Role ID */
  roleId: string;
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

/** Request to create a new mobile application */
export interface CreateMobileApplicationRequest {
  /** Unique bundle identifier for the mobile application (e.g., com.example.app) */
  bundleId: string;
  /** Mobile application name */
  name: string;
  /** Mobile application description */
  description?: string;
}

/** Request to update a mobile application */
export interface UpdateMobileApplicationRequest {
  /** Mobile application name */
  name: string;
  /** Mobile application description */
  description?: string;
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
  /** Role information (null if user is not in an organization) */
  role?: RoleResponse | null;
  /** Invitation status (null for organization owners who were not invited) */
  invitationStatus?: InvitationStatusResponse | null;
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

/** Role information (roles are now global across all organizations) */
export interface RoleResponse {
  /** Role ID */
  id: string;
  /** Role name */
  name: string;
  /** Role description */
  description?: string;
  /** Bitwise permissions value as a string (e.g., "12345") */
  permissionsValue: string;
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
  /** Role information (roles are now global across all organizations) */
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
  /** Role information (roles are now global across all organizations) */
  role: RoleResponse;
  /**
   * When the member joined
   * @format date-time
   */
  joinedAt: string;
}

/** Paginated organization member response */
export interface PaginatedOrganizationMemberResponse {
  /** Array of members for this page */
  data: OrganizationMemberResponse[];
  /** Total number of items across all pages */
  total: number;
  /** Number of items in this page */
  count: number;
  /** Maximum items per page */
  itemsPerPage: number;
}

/** Mobile application information */
export interface MobileApplicationResponse {
  /** Mobile application ID */
  id: string;
  /** Bundle identifier for the mobile application */
  bundleId: string;
  /** Organization ID that owns this application */
  organizationId: string;
  /** Mobile application name */
  name: string;
  /** Mobile application description */
  description?: string;
  /** User ID who created the application */
  createdBy: string;
  /**
   * When the application was created
   * @format date-time
   */
  createdAt: string;
  /**
   * When the application was last updated
   * @format date-time
   */
  updatedAt?: string;
}

/** Build information */
export interface BuildResponse {
  /** Unique UUID identifier for the build */
  id: string;
  /** Organization ID */
  organizationId: string;
  /** Bundle identifier for the mobile application */
  bundleId: string;
  /** Git commit hash (unique identifier) */
  commitHash: string;
  /** Git branch name */
  branchName: string;
  /** Git commit message */
  commitMessage?: string;
  /**
   * Build file size in bytes
   * @format int64
   */
  buildSize: number;
  /** URL to download the build file */
  buildUrl: string;
  /** Native app version (e.g., "1.0.0") */
  nativeVersion: string;
  /** User ID who uploaded the build */
  uploadedBy: string;
  /**
   * When the build was uploaded
   * @format date-time
   */
  createdAt: string;
  /**
   * When the build was last updated
   * @format date-time
   */
  updatedAt?: string;
}

/** Paginated build response */
export interface PaginatedBuildResponse {
  /** Array of builds for this page */
  data: BuildResponse[];
  /** Current page number */
  page: number;
  /** Items per page */
  size: number;
  /** Total number of builds */
  totalElements: number;
  /** Total number of pages */
  totalPages: number;
}

/** Paginated API key response */
export interface PaginatedApiKeyResponse {
  /** Array of API keys for this page */
  data: ApiKeyResponse[];
  /** Current page number */
  page: number;
  /** Items per page */
  size: number;
  /** Total number of API keys */
  totalElements: number;
  /** Total number of pages */
  totalPages: number;
}

/** Request to create an API key */
export interface CreateApiKeyRequest {
  /** Name/description for the API key */
  name: string;
}

/** API key information */
export interface ApiKeyResponse {
  /** Unique identifier for the API key */
  id: string;
  /** Name/description of the API key */
  name: string;
  /** The actual API key (only returned on creation) */
  key?: string;
  /** Masked key display (e.g., "flyw...xyz") */
  keyPrefix: string;
  /** Bundle ID this key is for */
  bundleId: string;
  /** Organization ID */
  organizationId: string;
  /** User ID who created the key */
  createdBy: string;
  /**
   * When the key was last used
   * @format date-time
   */
  lastUsedAt?: string;
  /**
   * When the key was created
   * @format date-time
   */
  createdAt: string;
  /**
   * When the key was last updated
   * @format date-time
   */
  updatedAt?: string;
}

/** Permission information */
export interface PermissionResponse {
  /** Permission code (e.g., "organization.update") */
  code: string;
  /** Human-readable permission label */
  label: string;
  /** Permission description */
  description: string;
  /** Permission category (e.g., "organization", "member", "role") */
  category: string;
  /** Bitwise permission value as a string */
  bitValue: string;
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
      baseURL: axiosConfig.baseURL || "http://localhost:8080/api",
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
 * @baseUrl http://localhost:8080/api
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
      this.request<AuthResponse, ErrorResponse>({
        path: `/auth/refresh`,
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
     * @name Logout
     * @summary Logout user
     * @request POST:/auth/logout
     */
    logout: (data: RefreshTokenRequest, params: RequestParams = {}) =>
      this.request<void, ErrorResponse>({
        path: `/auth/logout`,
        method: "POST",
        body: data,
        type: ContentType.Json,
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
     * @name GetUserById
     * @summary Get user by ID
     * @request GET:/users/{id}
     * @secure
     */
    getUserById: (id: string, params: RequestParams = {}) =>
      this.request<UserResponse, ErrorResponse>({
        path: `/users/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UpdateUser
     * @summary Update user
     * @request PUT:/users/{id}
     * @secure
     */
    updateUser: (
      id: string,
      data: UpdateUserRequest,
      params: RequestParams = {},
    ) =>
      this.request<UserResponse, ErrorResponse>({
        path: `/users/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name DeleteUser
     * @summary Delete user
     * @request DELETE:/users/{id}
     * @secure
     */
    deleteUser: (id: string, params: RequestParams = {}) =>
      this.request<void, ErrorResponse>({
        path: `/users/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name VerifyEmail
     * @summary Verify user email
     * @request POST:/users/{id}/verify-email
     * @secure
     */
    verifyEmail: (id: string, params: RequestParams = {}) =>
      this.request<UserResponse, ErrorResponse>({
        path: `/users/${id}/verify-email`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name GetAllUsers
     * @summary Get all users in organization
     * @request GET:/users
     * @secure
     */
    getAllUsers: (params: RequestParams = {}) =>
      this.request<UserResponse[], ErrorResponse>({
        path: `/users`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  organizations = {
    /**
     * No description
     *
     * @tags Organizations
     * @name GetCurrentOrganization
     * @summary Get current organization
     * @request GET:/organizations
     * @secure
     */
    getCurrentOrganization: (params: RequestParams = {}) =>
      this.request<OrganizationResponse, ErrorResponse>({
        path: `/organizations`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

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
     * @name UpdateCurrentOrganization
     * @summary Update current organization
     * @request PUT:/organizations
     * @secure
     */
    updateCurrentOrganization: (
      data: UpdateOrganizationRequest,
      params: RequestParams = {},
    ) =>
      this.request<OrganizationResponse, ErrorResponse>({
        path: `/organizations`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  roles = {
    /**
     * @description Returns all global roles that can be assigned to organization members
     *
     * @tags Roles
     * @name GetRoles
     * @summary Get all available roles
     * @request GET:/roles
     * @secure
     */
    getRoles: (params: RequestParams = {}) =>
      this.request<RoleResponse[], ErrorResponse>({
        path: `/roles`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  permissions = {
    /**
     * @description Returns all permissions that can be assigned to roles
     *
     * @tags Permissions
     * @name GetPermissions
     * @summary Get all available permissions
     * @request GET:/permissions
     * @secure
     */
    getPermissions: (params: RequestParams = {}) =>
      this.request<PermissionResponse[], ErrorResponse>({
        path: `/permissions`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  invitations = {
    /**
     * @description Create an invitation to add a new member to the organization - requires invitation.create permission
     *
     * @tags Invitations
     * @name CreateInvitation
     * @summary Create a new invitation
     * @request POST:/invitations
     * @secure
     */
    createInvitation: (
      data: CreateInvitationRequest,
      params: RequestParams = {},
    ) =>
      this.request<InvitationResponse, ErrorResponse>({
        path: `/invitations`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Public endpoint to retrieve invitation details by token
     *
     * @tags Invitations
     * @name GetInvitationByToken
     * @summary Get invitation by token (public endpoint)
     * @request GET:/invitations/token/{token}
     */
    getInvitationByToken: (token: string, params: RequestParams = {}) =>
      this.request<InvitationResponse, ErrorResponse>({
        path: `/invitations/token/${token}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Public endpoint to accept an invitation
     *
     * @tags Invitations
     * @name AcceptInvitation
     * @summary Accept invitation (public endpoint)
     * @request POST:/invitations/token/{token}/accept
     */
    acceptInvitation: (token: string, params: RequestParams = {}) =>
      this.request<InvitationResponse, ErrorResponse>({
        path: `/invitations/token/${token}/accept`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * @description Public endpoint to reject an invitation
     *
     * @tags Invitations
     * @name RejectInvitation
     * @summary Reject invitation (public endpoint)
     * @request POST:/invitations/token/{token}/reject
     */
    rejectInvitation: (token: string, params: RequestParams = {}) =>
      this.request<InvitationResponse, ErrorResponse>({
        path: `/invitations/token/${token}/reject`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * @description Resend an invitation by user ID - requires invitation.create permission
     *
     * @tags Invitations
     * @name ResendInvitation
     * @summary Resend invitation (private endpoint)
     * @request POST:/invitations/users/{userId}/resend
     * @secure
     */
    resendInvitation: (userId: string, params: RequestParams = {}) =>
      this.request<InvitationResponse, ErrorResponse>({
        path: `/invitations/users/${userId}/resend`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  members = {
    /**
     * No description
     *
     * @tags Organization Members
     * @name GetMembers
     * @summary Get all members in organization
     * @request GET:/members
     * @secure
     */
    getMembers: (
      query?: {
        /**
         * Page number (0-based)
         * @min 0
         * @default 0
         */
        page?: number;
        /**
         * Number of items per page
         * @min 1
         * @max 100
         * @default 20
         */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedOrganizationMemberResponse, ErrorResponse>({
        path: `/members`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organization Members
     * @name AddMember
     * @summary Add a member to organization
     * @request POST:/members
     * @secure
     */
    addMember: (
      data: AddOrganizationMemberRequest,
      params: RequestParams = {},
    ) =>
      this.request<OrganizationMemberResponse, ErrorResponse>({
        path: `/members`,
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
     * @tags Organization Members
     * @name GetMemberById
     * @summary Get member by ID
     * @request GET:/members/{memberId}
     * @secure
     */
    getMemberById: (memberId: string, params: RequestParams = {}) =>
      this.request<OrganizationMemberResponse, ErrorResponse>({
        path: `/members/${memberId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organization Members
     * @name UpdateMemberRole
     * @summary Update member role
     * @request PUT:/members/{memberId}
     * @secure
     */
    updateMemberRole: (
      memberId: string,
      data: UpdateMemberRoleRequest,
      params: RequestParams = {},
    ) =>
      this.request<OrganizationMemberResponse, ErrorResponse>({
        path: `/members/${memberId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Organization Members
     * @name RemoveMember
     * @summary Remove member from organization
     * @request DELETE:/members/{memberId}
     * @secure
     */
    removeMember: (memberId: string, params: RequestParams = {}) =>
      this.request<void, ErrorResponse>({
        path: `/members/${memberId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  mobileApplications = {
    /**
     * No description
     *
     * @tags Mobile Applications
     * @name GetAllMobileApplications
     * @summary Get all mobile applications for the organization
     * @request GET:/mobile-applications
     * @secure
     */
    getAllMobileApplications: (params: RequestParams = {}) =>
      this.request<MobileApplicationResponse[], ErrorResponse>({
        path: `/mobile-applications`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Mobile Applications
     * @name CreateMobileApplication
     * @summary Create a new mobile application
     * @request POST:/mobile-applications
     * @secure
     */
    createMobileApplication: (
      data: CreateMobileApplicationRequest,
      params: RequestParams = {},
    ) =>
      this.request<MobileApplicationResponse, ErrorResponse>({
        path: `/mobile-applications`,
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
     * @tags Mobile Applications
     * @name GetMobileApplicationByBundleId
     * @summary Get mobile application by bundle ID
     * @request GET:/mobile-applications/bundle/{bundleId}
     * @secure
     */
    getMobileApplicationByBundleId: (
      bundleId: string,
      params: RequestParams = {},
    ) =>
      this.request<MobileApplicationResponse, ErrorResponse>({
        path: `/mobile-applications/bundle/${bundleId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Mobile Applications
     * @name GetMobileApplicationById
     * @summary Get mobile application by ID
     * @request GET:/mobile-applications/{id}
     * @secure
     */
    getMobileApplicationById: (id: string, params: RequestParams = {}) =>
      this.request<MobileApplicationResponse, ErrorResponse>({
        path: `/mobile-applications/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Mobile Applications
     * @name UpdateMobileApplication
     * @summary Update mobile application
     * @request PUT:/mobile-applications/{id}
     * @secure
     */
    updateMobileApplication: (
      id: string,
      data: UpdateMobileApplicationRequest,
      params: RequestParams = {},
    ) =>
      this.request<MobileApplicationResponse, ErrorResponse>({
        path: `/mobile-applications/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Mobile Applications
     * @name DeleteMobileApplication
     * @summary Delete mobile application
     * @request DELETE:/mobile-applications/{id}
     * @secure
     */
    deleteMobileApplication: (id: string, params: RequestParams = {}) =>
      this.request<void, ErrorResponse>({
        path: `/mobile-applications/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  orgId = {
    /**
     * No description
     *
     * @tags Builds
     * @name GetBuilds
     * @summary Get builds with pagination and sorting
     * @request GET:/{orgId}/{bundleId}/builds
     * @secure
     */
    getBuilds: (
      orgId: string,
      bundleId: string,
      query?: {
        /**
         * Page number (default 0)
         * @default 0
         */
        page?: number;
        /**
         * Page size (default 20)
         * @default 20
         */
        size?: number;
        /**
         * Sort direction by createdAt (default desc)
         * @default "desc"
         */
        sort?: "asc" | "desc";
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedBuildResponse, void | ErrorResponse>({
        path: `/${orgId}/${bundleId}/builds`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description DEPRECATED: This endpoint has been removed. Use the API key-based upload endpoint at /v1/builds instead.
     *
     * @tags Builds
     * @name UploadBuild
     * @summary Upload a new build
     * @request POST:/{orgId}/{bundleId}/builds
     * @deprecated
     * @secure
     */
    uploadBuild: (
      orgId: string,
      bundleId: string,
      data: {
        /** Git commit hash (unique identifier for the build) */
        commitHash: string;
        /** Git branch name */
        branchName: string;
        /** Git commit message */
        commitMessage?: string;
        /** Native app version (e.g., "1.0.0") */
        nativeVersion: string;
        /**
         * The build file (APK/IPA, max 30MB)
         * @format binary
         */
        file: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<BuildResponse, void | ErrorResponse>({
        path: `/${orgId}/${bundleId}/builds`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags API Keys
     * @name GetApiKeys
     * @summary Get API keys with pagination and sorting
     * @request GET:/{orgId}/{bundleId}/api-keys
     * @secure
     */
    getApiKeys: (
      orgId: string,
      bundleId: string,
      query?: {
        /**
         * Page number (default 0)
         * @default 0
         */
        page?: number;
        /**
         * Page size (default 20)
         * @default 20
         */
        size?: number;
        /**
         * Sort direction by createdAt (default desc)
         * @default "desc"
         */
        sort?: "asc" | "desc";
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedApiKeyResponse, ErrorResponse>({
        path: `/${orgId}/${bundleId}/api-keys`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags API Keys
     * @name CreateApiKey
     * @summary Create a new API key
     * @request POST:/{orgId}/{bundleId}/api-keys
     * @secure
     */
    createApiKey: (
      orgId: string,
      bundleId: string,
      data: CreateApiKeyRequest,
      params: RequestParams = {},
    ) =>
      this.request<ApiKeyResponse, void | ErrorResponse>({
        path: `/${orgId}/${bundleId}/api-keys`,
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
     * @tags API Keys
     * @name DeleteApiKey
     * @summary Delete an API key
     * @request DELETE:/{orgId}/{bundleId}/api-keys/{keyId}
     * @secure
     */
    deleteApiKey: (
      orgId: string,
      bundleId: string,
      keyId: string,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorResponse>({
        path: `/${orgId}/${bundleId}/api-keys/${keyId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  builds = {
    /**
     * No description
     *
     * @tags Builds
     * @name DeleteBuild
     * @summary Delete a build by its UUID
     * @request DELETE:/builds/{buildId}
     * @secure
     */
    deleteBuild: (buildId: string, params: RequestParams = {}) =>
      this.request<void, ErrorResponse>({
        path: `/builds/${buildId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  v1 = {
    /**
     * @description Upload builds using API key authentication. This is the only way to upload builds and is designed for CI/CD pipelines. Requires X-API-Key header instead of JWT token.
     *
     * @tags Builds, API Keys
     * @name UploadBuildWithApiKey
     * @summary Upload a new build using API key authentication
     * @request POST:/v1/builds
     */
    uploadBuildWithApiKey: (
      data: {
        /** Git commit hash (unique identifier for the build) */
        commitHash: string;
        /** Git branch name */
        branchName: string;
        /** Git commit message */
        commitMessage?: string;
        /** Native app version (e.g., "1.0.0") */
        nativeVersion: string;
        /**
         * The build file (APK/IPA, max 30MB)
         * @format binary
         */
        file: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<BuildResponse, void | ErrorResponse>({
        path: `/v1/builds`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
}
