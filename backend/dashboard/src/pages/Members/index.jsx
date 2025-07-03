import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { Table, Tag, Alert } from "antd";
import { useQuery } from "@tanstack/react-query";
import "antd/dist/reset.css";
import "react-loading-skeleton/dist/skeleton.css";
import "../../styles/AntdCustom.css";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const Members = () => {
    const fetchMembers = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/v1/members`);
            if (!response.data || !Array.isArray(response.data.data)) {
                throw new Error("API response data is empty or not an array.");
            }
            return response.data.data;
        } catch (err) {
            console.error("Error fetching members data:", err);
            throw new Error(err.response?.data?.message || err.message || "Failed to fetch members data");
        }
    };

    const {
        data: members,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["allMembers"],
        queryFn: fetchMembers,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
    });

    const dataSource = members
        ? members.map((member, index) => ({
              key: member.id,
              no: index + 1,
              email: member.email,
              username: member.username,
              name: member.name,
              status: member.status,
              kyc: member.kyc_status,
          }))
        : [];

    const columns = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
            width: 70,
            align: "center",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                let color = "geekblue";
                if (status === "Active") {
                    color = "green";
                } else if (status === "Inactive") {
                    color = "red";
                }
                return (
                    <Tag color={color} className="rounded-full px-3 py-1 font-medium">
                        {status ? status.toUpperCase() : "UNKNOWN"}
                    </Tag>
                );
            },
        },
        {
            title: "KYC Status",
            dataIndex: "kyc",
            key: "kyc",
            render: (kyc) => {
                let color = "geekblue";
                if (kyc === "Verified") {
                    color = "blue";
                } else if (kyc === "Pending") {
                    color = "orange";
                } else if (kyc === "Rejected") {
                    color = "red";
                } else if (kyc === "No-KYC") {
                    color = "gray";
                }
                return (
                    <Tag color={color} className="rounded-full px-3 py-1 font-medium">
                        {kyc ? kyc.toUpperCase().replace("-", " ") : "UNKNOWN"}
                    </Tag>
                );
            },
        },
    ];

    return (
        <main className="w-full h-screen bg-black text-white flex">
            <Sidebar />
            <Navbar />
            <div className="flex flex-col flex-1">
                <section className="flex-1 p-8 overflow-auto mt-28 lg:ml-72">
                    <div className="mb-6">
                        <h1 className="text-xl font-semibold border-b-2 border-[#121B2E] pb-2 inline-block">List of Members</h1>
                    </div>

                    <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-[#121B2E]">
                        {isLoading ? (
                            <Skeleton count={8} height={40} className="my-2" baseColor="#374151" highlightColor="#4B5563" />
                        ) : isError ? (
                            <Alert
                                message="Error"
                                description={`Failed to load member data: ${error.message}`}
                                type="error"
                                showIcon
                                className="bg-red-900 text-white border-red-700"
                                style={{ backgroundColor: "#dc2626", borderColor: "#b91c1c", color: "white" }}
                            />
                        ) : (
                            <Table
                                dataSource={dataSource}
                                columns={columns}
                                pagination={{
                                    pageSize: 10,
                                    showSizeChanger: true,
                                    pageSizeOptions: ["10", "25", "50", "100"],
                                    className: "custom-antd-pagination",
                                }}
                                bordered={false}
                                className="custom-antd-table"
                                scroll={{ x: "max-content" }}
                            />
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Members;
