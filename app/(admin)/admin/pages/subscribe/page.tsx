"use client";
import React, { useEffect, useState } from "react";
import {
  Trash2,
  X,
  Mail,
  Calendar,
  User,
  CheckCircle,
  XCircle,
} from "lucide-react";
import axiosInstance from "@/app/lib/axios";
interface Subscriber {
  _id: string;
  email: string;
  opt: boolean;
  createdAt: string;
}
const SubscriberPage = () => {
  const [selectedSubscriber, setSelectedSubscriber] =
    useState<Subscriber | null>(null);
  const [showInfoSidebar, setShowInfoSidebar] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const fetchSubscribers = async () => {
    try {
      setFetchLoading(true);
      const res = await axiosInstance.get("/subscribe");
      const data = res?.data?.data || [];
      const mappedData: Subscriber[] = data.map((item: any) => ({
        _id: item._id,
        email: item.email,
        opt: item.opt,
        createdAt: item.createdAt,
      }));
      setSubscribers(mappedData);
    } catch (error) {
      console.error("Failed to fetch subscribers:", error);
      setSubscribers([]);
    } finally {
      setFetchLoading(false);
    }
  };
  useEffect(() => {
    fetchSubscribers();
  }, []);
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subscriber?",
    );
    if (!confirmDelete) return;
    try {
      setDeleteLoading(id);
      await axiosInstance.delete(`/subscribe?id=${id}`);
      setSubscribers((prev) =>
        prev.filter((subscriber) => subscriber._id !== id),
      );
      if (selectedSubscriber?._id === id) {
        closeSidebar();
      }
    } catch (error) {
      console.error("Failed to delete subscriber:", error);
    } finally {
      setDeleteLoading(null);
    }
  };
  const handleViewDetails = (subscriber: Subscriber) => {
    setSelectedSubscriber(subscriber);
    setShowInfoSidebar(true);
  };
  const closeSidebar = () => {
    setShowInfoSidebar(false);
    setSelectedSubscriber(null);
  };
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {" "}
      {/* Header */}{" "}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {" "}
        <div>
          {" "}
          <h1 className="text-2xl font-bold text-gray-900">
            {" "}
            Subscribers{" "}
          </h1>{" "}
          <p className="mt-1 text-sm text-gray-500">
            {" "}
            Manage Ooshas Prep subscribers and their information.{" "}
          </p>{" "}
        </div>{" "}
        <div className="text-sm text-gray-500">
          {" "}
          Total Subscribers:{" "}
          <span className="font-semibold text-gray-900">
            {" "}
            {subscribers.length}{" "}
          </span>{" "}
        </div>{" "}
      </div>{" "}
      {/* Table */}{" "}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {" "}
        {fetchLoading ? (
          <div className="flex min-h-[250px] items-center justify-center">
            {" "}
            <p className="text-sm text-gray-500">
              {" "}
              Loading subscribers...{" "}
            </p>{" "}
          </div>
        ) : subscribers.length === 0 ? (
          <div className="flex min-h-[250px] flex-col items-center justify-center">
            {" "}
            <div className="mb-3 rounded-full bg-orange-50 p-4">
              {" "}
              <User size={28} className="text-orange-500" />{" "}
            </div>{" "}
            <h3 className="font-semibold text-gray-900">
              {" "}
              No subscribers found{" "}
            </h3>{" "}
            <p className="mt-1 text-sm text-gray-500">
              {" "}
              No subscribers have been added yet.{" "}
            </p>{" "}
          </div>
        ) : (
          <div className="overflow-x-auto">
            {" "}
            <table className="w-full">
              {" "}
              <thead className="border-b border-gray-200 bg-gray-50">
                {" "}
                <tr>
                  {" "}
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-black">
                    {" "}
                    #{" "}
                  </th>{" "}
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-black">
                    {" "}
                    Email{" "}
                  </th>{" "}
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-black">
                    {" "}
                    Status{" "}
                  </th>{" "}
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-black">
                    {" "}
                    Created At{" "}
                  </th>{" "}
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-black">
                    {" "}
                    Actions{" "}
                  </th>{" "}
                </tr>{" "}
              </thead>{" "}
              <tbody className="divide-y divide-gray-100">
                {" "}
                {subscribers.map((subscriber, index) => (
                  <tr
                    key={subscriber._id}
                    className="transition hover:bg-gray-50"
                  >
                    {" "}
                    {/* Number */}{" "}
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {" "}
                      {index + 1}{" "}
                    </td>{" "}
                    {/* Email */}{" "}
                    <td className="px-6 py-4">
                      {" "}
                      <div className="flex items-center gap-3">
                        {" "}
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100">
                          {" "}
                          <Mail size={17} className="text-orange-500" />{" "}
                        </div>{" "}
                        <span className="font-medium text-gray-900">
                          {" "}
                          {subscriber.email || "N/A"}{" "}
                        </span>{" "}
                      </div>{" "}
                    </td>{" "}
                    {/* Status */}{" "}
                    <td className="px-6 py-4">
                      {" "}
                      {subscriber.opt ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600">
                          {" "}
                          <CheckCircle size={14} /> Subscribed{" "}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
                          {" "}
                          <XCircle size={14} /> Not Subscribed{" "}
                        </span>
                      )}{" "}
                    </td>{" "}
                    {/* Created At */}{" "}
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {" "}
                      {formatDate(subscriber.createdAt)}{" "}
                    </td>{" "}
                    {/* Actions */}{" "}
                    <td className="px-6 py-4">
                      {" "}
                      <div className="flex items-center justify-end gap-2">
                        {" "}
                        <button
                          type="button"
                          onClick={() => handleViewDetails(subscriber)}
                          className="rounded-lg border border-blue-100 p-2 text-blue-600 transition hover:bg-blue-50"
                          title="View Details"
                        >
                          {" "}
                          <User size={17} />{" "}
                        </button>{" "}
                        <button
                          type="button"
                          onClick={() => handleDelete(subscriber._id)}
                          disabled={deleteLoading === subscriber._id}
                          className="rounded-lg border border-red-100 p-2 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          title="Delete Subscriber"
                        >
                          {" "}
                          <Trash2 size={17} />{" "}
                        </button>{" "}
                      </div>{" "}
                    </td>{" "}
                  </tr>
                ))}{" "}
              </tbody>{" "}
            </table>{" "}
          </div>
        )}{" "}
      </div>{" "}
      {/* Details Sidebar */}{" "}
      {showInfoSidebar && selectedSubscriber && (
        <div
          className="fixed inset-0 z-[999] flex justify-end bg-black/30"
          onClick={closeSidebar}
        >
          {" "}
          <div
            className="relative h-full w-full max-w-lg bg-white shadow-2xl animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            {" "}
            {/* Sidebar Header */}{" "}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              {" "}
              <div>
                {" "}
                <h2 className="text-lg font-semibold text-gray-900">
                  {" "}
                  Subscriber Information{" "}
                </h2>{" "}
                <p className="text-xs text-gray-500">
                  {" "}
                  Subscriber details{" "}
                </p>{" "}
              </div>{" "}
              <button
                type="button"
                onClick={closeSidebar}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
              >
                {" "}
                <X size={20} />{" "}
              </button>{" "}
            </div>{" "}
            {/* Sidebar Content */}{" "}
            <div className="h-[calc(100%-73px)] overflow-y-auto p-6">
              {" "}
              {/* Profile */}{" "}
              <div className="mb-6 flex items-center gap-4">
                {" "}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                  {" "}
                  <Mail size={30} className="text-orange-500" />{" "}
                </div>{" "}
                <div className="min-w-0">
                  {" "}
                  <h3 className="text-xl font-semibold text-gray-900">
                    {" "}
                    Subscriber{" "}
                  </h3>{" "}
                  <p className="break-all text-sm text-gray-500">
                    {" "}
                    {selectedSubscriber.email}{" "}
                  </p>{" "}
                </div>{" "}
              </div>{" "}
              {/* Email */}{" "}
              <div className="mb-4 rounded-lg border border-gray-100 bg-gray-50 p-4">
                {" "}
                <div className="flex items-start gap-3">
                  {" "}
                  <Mail size={18} className="mt-0.5 text-orange-500" />{" "}
                  <div className="min-w-0">
                    {" "}
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      {" "}
                      Email{" "}
                    </p>{" "}
                    <p className="mt-1 break-all text-sm text-gray-900">
                      {" "}
                      {selectedSubscriber.email}{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              {/* Subscription Status */}{" "}
              <div className="mb-4 rounded-lg border border-gray-100 bg-gray-50 p-4">
                {" "}
                <div className="flex items-start gap-3">
                  {" "}
                  {selectedSubscriber.opt ? (
                    <CheckCircle size={18} className="mt-0.5 text-green-500" />
                  ) : (
                    <XCircle size={18} className="mt-0.5 text-red-500" />
                  )}{" "}
                  <div>
                    {" "}
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      {" "}
                      Subscription Status{" "}
                    </p>{" "}
                    <p
                      className={`mt-1 text-sm font-medium ${selectedSubscriber.opt ? "text-green-600" : "text-red-600"}`}
                    >
                      {" "}
                      {selectedSubscriber.opt
                        ? "Subscribed"
                        : "Not Subscribed"}{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              {/* Created At */}{" "}
              <div className="mb-4 rounded-lg border border-gray-100 bg-gray-50 p-4">
                {" "}
                <div className="flex items-start gap-3">
                  {" "}
                  <Calendar size={18} className="mt-0.5 text-orange-500" />{" "}
                  <div>
                    {" "}
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      {" "}
                      Created At{" "}
                    </p>{" "}
                    <p className="mt-1 text-sm text-gray-900">
                      {" "}
                      {formatDate(selectedSubscriber.createdAt)}{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              {/* Delete */}{" "}
              <div className="mt-6 border-t border-gray-200 pt-6">
                {" "}
                <button
                  type="button"
                  onClick={() => handleDelete(selectedSubscriber._id)}
                  disabled={deleteLoading === selectedSubscriber._id}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {" "}
                  <Trash2 size={18} />{" "}
                  {deleteLoading === selectedSubscriber._id
                    ? "Deleting..."
                    : "Delete Subscriber"}{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
      {/* Animation */}{" "}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>{" "}
    </div>
  );
};
export default SubscriberPage;
