/**
 * @fileoverview Sorts import statements starting from node_modules, then onto user's own files
 * @author Emre AYDIN
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: "layout",
    docs: {
      description:
        "Sorts import statements starting from node_modules, then onto user's own files",
      category: "Fill me in",
      recommended: false,
    },
    fixable: "code", // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ],
  },

  create: function (context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------
    const getNodesForType = (context, type) =>
      context.getScope().block.body.filter((node) => node.type === type);

    const sortByDepth = (l, r) => {
      const lcount = l.source.value.match(/^\.*/)[0].length;
      const rcount = r.source.value.match(/^\.*/)[0].length;
      return lcount - rcount;
    };
    const sortImportsByDepth = (nodeArr) => {
      return [...nodeArr].sort((l, r) => {
        if (sortByDepth(l, r) === 0) {
          const lcount = (l.source.value.match(/\//g) || []).length;
          const rcount = (r.source.value.match(/\//g) || []).length;
          return lcount > rcount;
        }
        return sortByDepth(l, r);
      });
    };

    const areImportsSorted = (nodeArr, sortedArr) => {
      return nodeArr.every(
        (node, index) => node.source.value === sortedArr[index].source.value
      );
    };

    const getImportNames = (node, type) => {
      return node.specifiers
        .filter((spec) => spec.type === type)
        .map((spec) => spec.local.name);
    };

    const formatImport = (node, defImports, nonDefImports) => {
      const defStr = defImports.length
        ? `${defImports.join()}${nonDefImports.length ? ", " : ""}`
        : "";
      const nonDefStr = nonDefImports.length
        ? `{ ${nonDefImports.join()} }`
        : "";
      return `import ${defStr}${nonDefStr} from "${node.source.value}"`;
    };

    const createNewImports = (sortedNodes) => {
      return sortedNodes.map((node) => {
        let impDef = getImportNames(node, "ImportDefaultSpecifier");
        let impNonDef = getImportNames(node, "ImportSpecifier");

        return formatImport(node, impDef, impNonDef);
      });
    };

    const fixImports = (nodeArr, sortedArr, fixer) => {
      const imports = createNewImports(sortedArr);

      return nodeArr.map((node, index) =>
        fixer.replaceTextRange(node.range, imports[index])
      );
    };
    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      Program() {
        const imports = getNodesForType(context, "ImportDeclaration");
        const sorted = sortImportsByDepth(imports);

        if (!areImportsSorted(imports, sorted)) {
          context.report({
            node: imports[0],
            message: "Imports are not sorted",
            fix: function (fixer) {
              return fixImports(imports, sorted, fixer);
            },
          });
        }
      },
    };
  },
};
