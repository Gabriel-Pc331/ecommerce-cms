import {
    BreadCrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@components/BrandCrumbs";

type BreadCrumbProps = {
    title: string;
}

export function BreadCrumb({ title }: BreadCrumbProps) {
    return (
        <BreadCrumb title={""}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{title}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </BreadCrumb>
    )
}
 import { BreadCrumb } from "@/components/layout/BreadCrumb"
import { CategoryDataTable } from "./data-table/category-data-table"

export function CategoryLayout() {
    return (
        <div className="flex-col py-4 gap-4">

            <BreadCrumb title="Categorias" />

            <div>
                <CategoryDataTable />
            </div>
        </div>
    )
}