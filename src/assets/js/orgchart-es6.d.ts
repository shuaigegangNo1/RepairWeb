// Type definitions for orgchart-es6.js
// Project: [LIBRARY_URL_HERE]
// Definitions by: [YOUR_NAME_HERE] <[YOUR_URL_HERE]>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

export declare interface OrgChart {

    /**
     *
     * @param options
     */
    new (options: any);

    /**
     * show the parent node of the specified node
     * @param node
     */
    showParent(node: any): void;

    /**
     * show the sibling nodes of the specified node
     * @param node
     * @param direction
     */
    showSiblings(node: any, direction: string): void;

    /**
     * hide the sibling nodes of the specified node
     * @param node
     * @param direction
     */
    hideSiblings(node: any, direction: string): void;

    /**
     * recursively hide the ancestor node and sibling nodes of the specified node
     * @param node
     */
    hideParent(node: any): void;

    /**
     * exposed method
     * @param currentRoot
     * @param data
     */
    addParent(currentRoot: any, data: any): void;

    /**
     * recursively hide the descendant nodes of the specified node
     * @param node
     */
    hideChildren(node: any): void;

    /**
     * show the children nodes of the specified node
     * @param node
     */
    showChildren(node: any): void;

    /**
     * exposed method
     * @param node
     * @param data
     */
    addChildren(node: any, data: OrgChart.prototype.AddChildren1): void;

    /**
     *
     * @param node
     * @param data
     */
    addSiblings(node: any, data: any): void;

    /**
     *
     * @param node
     */
    removeNodes(node: any): void;

    /**
     *
     * @param appendTo
     * @param nodeData
     * @param level
     * @param callback
     */
    buildHierarchy(appendTo: any, nodeData: {} | any, level: number, callback: OrgChart.prototype.BuildHierarchy3): void;

    /**
     *
     * @return
     */
    getHierarchy(): string;

    getChart(): any;

    getClickedNode(): any;

    getDraggedInfo(): any;

    /**
     *
     */
    options: {

        data: any;

        chartContainer: string,

        /**
         *drag mode:
         * "sameLevel": only operate same level node: current only support drag
         * "diffLevel": only operate different level node. Default set.
         */
        mode?: string;

        /**
         *
         */
        nodeTitle?: string;

        /**
         *
         */
        nodeId?: string;

        /**
         *
         */
        toggleSiblingsResp?: boolean;

        /**
         *
         */
        depth?: number;

        /**
         *
         */
        chartClass?: string;

        /**
         *
         */
        exportButton?: boolean;

        /**
         *
         */
        exportFilename?: string;

        /**
         *
         */
        parentNodeSymbol?: string;

        /**
         *
         */
        draggable?: boolean;

        /**
         *
         */
        direction?: string;

        /**
         *
         */
        pan?: boolean;

        /**
         *
         */
        zoom?: boolean;
        /**
         * add
         */
        nodeInfo?: string;
    }
}

export declare namespace OrgChart.prototype{
    // Promise.prototype.finally.!0
    type Finally0 = (() => void);
    type _closest1 = ((el: any) => boolean);
    type _siblings0 = Array<any>;
    type _siblingsRet = Array<any>;
    type _prevAllRet = Array<any>;
    type _nextAllRet = Array<any>;
    type _addClass0 = Array<any>;
    type _removeClass0 = Array<any>;
    type _css0 = Array<any>;
    type _removeAttr0 = Array<any>;
    type _one2 = (() => void);
    type _one3 = OrgChart;
    type _getDescElementsRet = Array<any>;

    interface _buildJsonDSRet {
        relationship: string;
        children: Array</* OrgChart.prototype._buildJsonDS.!ret */ any>;
    }

    interface _attachRel0 {
        relationship: string;
    }

    interface _getNodeStateRet {
        exist: boolean;
        visible: boolean;
    }

    interface _buildParentNode1 {
        relationship: string;
    }

    interface AddChildren1 {
        children: Array</* OrgChart.prototype.addChildren.!1 */ any>;
    }

    type GetRelatedNodesRet = Array<any>;
    type _buildParentNode2 = (() => void);
    type _buildChildNode2 = (() => void);
    type _buildSiblingNode2 = (() => void);
    type BuildHierarchy3 = (() => void);
}


