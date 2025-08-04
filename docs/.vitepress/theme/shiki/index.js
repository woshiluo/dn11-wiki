export const birdGrammar = {
  name: "bird",
  scopeName: "source.bird",
  fileTypes: [".conf"],
  // 因为我们原来写的不全，所以用社区的↓
  //https://github.com/BIRD-Chinese-Community/BIRD-tm-language-grammar
  author: "BIRD Chinese Community (Alice39s) <dev-bird@xmsl.dev>",
  displayName: "Bird Configuration",
  patterns: [
    {
      include: "#comments"
    },
    {
      include: "#strings"
    },
    {
      include: "#numbers"
    },
    {
      include: "#ip-addresses"
    },
    {
      include: "#vpn-rd"
    },
    {
      include: "#bytestrings"
    },
    {
      include: "#bgp-paths"
    },
    {
      include: "#prefixes"
    },
    {
      include: "#template-definitions"
    },
    {
      include: "#filter-definitions"
    },
    {
      include: "#function-definitions"
    },
    {
      include: "#protocol-definitions"
    },
    {
      include: "#next-hop-statements"
    },
    {
      include: "#import-export-statements"
    },
    {
      include: "#structural-keywords"
    },
    {
      include: "#functional-keywords"
    },
    {
      include: "#semantic-modifiers"
    },
    {
      include: "#builtin-functions"
    },
    {
      include: "#method-properties"
    },
    {
      include: "#route-attributes"
    },
    {
      include: "#data-types"
    },
    {
      include: "#operators"
    },
    {
      include: "#constants"
    },
    {
      include: "#filter-names"
    },
    {
      include: "#user-variables"
    },
    {
      include: "#function-calls"
    },
    {
      include: "#method-calls"
    },
    {
      include: "#variable-declarations"
    },
    {
      include: "#symbols"
    },
    {
      include: "#blocks"
    },
    {
      include: "#print-statements"
    }
  ],
  repository: {
    comments: {
      patterns: [
        {
          name: "comment.line.number-sign.bird",
          begin: "#",
          end: "$",
          beginCaptures: {
            0: {
              name: "punctuation.definition.comment.bird"
            }
          }
        },
        {
          name: "comment.block.bird",
          begin: "/\\*",
          end: "\\*/",
          beginCaptures: {
            0: {
              name: "punctuation.definition.comment.begin.bird"
            }
          },
          endCaptures: {
            0: {
              name: "punctuation.definition.comment.end.bird"
            }
          }
        }
      ]
    },
    strings: {
      patterns: [
        {
          name: "string.quoted.double.bird",
          begin: "\"",
          end: "\"",
          beginCaptures: {
            0: {
              name: "punctuation.definition.string.begin.bird"
            }
          },
          endCaptures: {
            0: {
              name: "punctuation.definition.string.end.bird"
            }
          },
          patterns: [
            {
              name: "constant.character.escape.bird",
              match: "\\\\."
            }
          ]
        },
        {
          name: "string.quoted.single.bird",
          begin: "'",
          end: "'",
          beginCaptures: {
            0: {
              name: "punctuation.definition.string.begin.bird"
            }
          },
          endCaptures: {
            0: {
              name: "punctuation.definition.string.end.bird"
            }
          }
        }
      ]
    },
    numbers: {
      patterns: [
        {
          name: "constant.numeric.hex.bird",
          match: "\\b0x[0-9a-fA-F]+\\b"
        },
        {
          name: "constant.numeric.decimal.bird",
          match: "\\b[0-9]+\\b"
        },
        {
          name: "constant.numeric.time.bird",
          match: "\\b[0-9]+\\s*(s|ms|us)\\b",
          captures: {
            1: {
              name: "keyword.other.unit.bird"
            }
          }
        }
      ]
    },
    "ip-addresses": {
      patterns: [
        {
          name: "constant.numeric.ip.ipv4.bird",
          match: "\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}(?:/[0-9]{1,2})?\\b"
        },
        {
          name: "constant.numeric.ip.ipv6.bird",
          match: "\\b(?:[0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}(?:/[0-9]{1,3})?\\b"
        },
        {
          name: "constant.numeric.ip.ipv6.bird",
          match: "::(?:[0-9a-fA-F]{0,4}:){0,6}[0-9a-fA-F]{0,4}(?:/[0-9]{1,3})?\\b"
        },
        {
          name: "constant.numeric.ip.ipv6.bird",
          match: "(?:[0-9a-fA-F]{0,4}:){1,6}::(?:[0-9a-fA-F]{0,4}:){0,5}[0-9a-fA-F]{0,4}(?:/[0-9]{1,3})?\\b"
        }
      ]
    },
    "vpn-rd": {
      name: "constant.numeric.vpn-rd.bird",
      match: "\\b(?:[0-9]+:[0-9]+|[0-2]:[0-9]+:[0-9]+|(?:[0-9]{1,3}\\.){3}[0-9]{1,3}:[0-9]+)\\b"
    },
    bytestrings: {
      patterns: [
        {
          name: "constant.numeric.bytestring.bird",
          match: "\\b(?:hex:)?(?:[0-9a-fA-F]{2}[:\\-\\s\\.]*){2,}[0-9a-fA-F]{2}\\b"
        },
        {
          name: "constant.numeric.bytestring.bird",
          match: "\\b[0-9a-fA-F]{32,}\\b"
        }
      ]
    },
    "bgp-paths": {
      patterns: [
        {
          name: "meta.bgp-path.bird",
          begin: "\\[=",
          end: "=\\]",
          beginCaptures: {
            0: {
              name: "punctuation.definition.bgp-path.begin.bird"
            }
          },
          endCaptures: {
            0: {
              name: "punctuation.definition.bgp-path.end.bird"
            }
          },
          patterns: [
            {
              name: "keyword.operator.wildcard.bird",
              match: "[*?+]"
            },
            {
              name: "constant.numeric.asn.bird",
              match: "\\b[0-9]+\\b"
            },
            {
              include: "#numbers"
            }
          ]
        }
      ]
    },
    prefixes: {
      patterns: [
        {
          name: "constant.numeric.prefix.bird",
          match: "\\b(?:(?:[0-9]{1,3}\\.){3}[0-9]{1,3}|(?:[0-9a-fA-F]{0,4}:)+[0-9a-fA-F]{0,4})/[0-9]{1,3}(?:[\\+\\-]|\\{[0-9]+,[0-9]+\\})?\\b"
        }
      ]
    },
    "filter-definitions": {
      patterns: [
        {
          name: "meta.filter-definition.bird",
          begin: "\\b(filter)\\s+([a-zA-Z_][a-zA-Z0-9_]*)\\s*\\{",
          end: "\\}",
          beginCaptures: {
            1: {
              name: "keyword.control.filter.bird"
            },
            2: {
              name: "entity.name.function.filter.bird"
            }
          },
          endCaptures: {
            0: {
              name: "punctuation.definition.block.end.bird"
            }
          },
          patterns: [
            {
              include: "$self"
            }
          ]
        }
      ]
    },
    "function-definitions": {
      patterns: [
        {
          name: "meta.function-definition.bird",
          begin: "\\b(function)\\s+([a-zA-Z_][a-zA-Z0-9_]*)\\s*\\(",
          end: "\\}",
          beginCaptures: {
            1: {
              name: "keyword.control.function.bird"
            },
            2: {
              name: "entity.name.function.user-defined.bird"
            }
          },
          endCaptures: {
            0: {
              name: "punctuation.definition.block.end.bird"
            }
          },
          patterns: [
            {
              name: "meta.function-parameters.bird",
              begin: "\\G(?=\\()",
              end: "\\)",
              patterns: [
                {
                  include: "#data-types"
                },
                {
                  include: "#symbols"
                }
              ]
            },
            {
              name: "meta.function-return-type.bird",
              begin: "->",
              end: "(?=\\{)",
              beginCaptures: {
                0: {
                  name: "keyword.operator.return-type.bird"
                }
              },
              patterns: [
                {
                  include: "#data-types"
                }
              ]
            },
            {
              include: "$self"
            }
          ]
        }
      ]
    },
    "template-definitions": {
      patterns: [
        {
          name: "meta.template-definition.bird",
          begin: "\\b(template)\\s+([a-zA-Z_][a-zA-Z0-9_]*)\\s+([a-zA-Z_][a-zA-Z0-9_]*)\\s*\\{",
          end: "\\}",
          beginCaptures: {
            1: {
              name: "keyword.control.template.bird"
            },
            2: {
              name: "entity.name.type.protocol.bird"
            },
            3: {
              name: "entity.name.function.template.bird"
            }
          },
          endCaptures: {
            0: {
              name: "punctuation.definition.block.end.bird"
            }
          },
          patterns: [
            {
              include: "$self"
            }
          ]
        }
      ]
    },
    "protocol-definitions": {
      patterns: [
        {
          name: "meta.protocol-definition-with-name.bird",
          begin: "\\b(protocol)\\s+([a-zA-Z_][a-zA-Z0-9_]*)\\s+([a-zA-Z_][a-zA-Z0-9_]*)\\s*\\{",
          end: "\\}",
          beginCaptures: {
            1: {
              name: "keyword.control.protocol.bird"
            },
            2: {
              name: "entity.name.type.protocol.bird"
            },
            3: {
              name: "entity.name.function.protocol.bird"
            }
          },
          endCaptures: {
            0: {
              name: "punctuation.definition.block.end.bird"
            }
          },
          patterns: [
            {
              include: "$self"
            }
          ]
        },
        {
          name: "meta.protocol-definition-anonymous.bird",
          begin: "\\b(protocol)\\s+([a-zA-Z_][a-zA-Z0-9_]*)\\s*\\{",
          end: "\\}",
          beginCaptures: {
            1: {
              name: "keyword.control.protocol.bird"
            },
            2: {
              name: "entity.name.type.protocol.bird"
            }
          },
          endCaptures: {
            0: {
              name: "punctuation.definition.block.end.bird"
            }
          },
          patterns: [
            {
              include: "$self"
            }
          ]
        }
      ]
    },
    "print-statements": {
      patterns: [
        {
          name: "meta.print-statement.bird",
          begin: "\\b(print|printn)\\b",
          end: ";",
          beginCaptures: {
            1: {
              name: "keyword.other.print.bird"
            }
          },
          endCaptures: {
            0: {
              name: "punctuation.terminator.statement.bird"
            }
          },
          patterns: [
            {
              include: "$self"
            }
          ]
        }
      ]
    },
    "next-hop-statements": {
      patterns: [
        {
          name: "meta.next-hop-ipv4.bird",
          match: "\\b(next hop)\\s+(ipv4)\\s+([0-9\\.]+)\\b",
          captures: {
            1: {
              name: "keyword.control.routing.bird"
            },
            2: {
              name: "keyword.other.ip-version.bird"
            },
            3: {
              name: "constant.numeric.ip-address.bird"
            }
          }
        },
        {
          name: "meta.next-hop-ipv6.bird",
          match: "\\b(next hop)\\s+(ipv6)\\s+([0-9a-fA-F:]+)\\b",
          captures: {
            1: {
              name: "keyword.control.routing.bird"
            },
            2: {
              name: "keyword.other.ip-version.bird"
            },
            3: {
              name: "constant.numeric.ip-address.bird"
            }
          }
        },
        {
          name: "meta.next-hop-simple.bird",
          match: "\\b(next hop)\\s+(self)\\b",
          captures: {
            1: {
              name: "keyword.control.routing.bird"
            },
            2: {
              name: "keyword.other.semantic-modifier.bird"
            }
          }
        },
        {
          name: "meta.extended-next-hop-statement.bird",
          match: "\\b(extended next hop)\\s+(on|off)\\b",
          captures: {
            1: {
              name: "keyword.control.routing.bird"
            },
            2: {
              name: "keyword.other.semantic-modifier.bird"
            }
          }
        }
      ]
    },
    "import-export-statements": {
      patterns: [
        {
          name: "meta.import-statement.bird",
          match: "\\b(import)\\s+(filter)\\s+([a-zA-Z_][a-zA-Z0-9_]*)\\b",
          captures: {
            1: {
              name: "keyword.control.import-export.bird"
            },
            2: {
              name: "keyword.control.filter.bird"
            },
            3: {
              name: "entity.name.function.filter.bird"
            }
          }
        },
        {
          name: "meta.export-statement.bird",
          match: "\\b(export)\\s+(filter)\\s+([a-zA-Z_][a-zA-Z0-9_]*)\\b",
          captures: {
            1: {
              name: "keyword.control.import-export.bird"
            },
            2: {
              name: "keyword.control.filter.bird"
            },
            3: {
              name: "entity.name.function.filter.bird"
            }
          }
        }
      ]
    },
    "structural-keywords": {
      patterns: [
        {
          name: "keyword.control.bird",
          match: "\\b(?:if|then|else|case|for|do|while|break|continue|return|in)\\b"
        },
        {
          name: "keyword.control.case.else.bird",
          match: "\\belse\\s*:"
        },
        {
          name: "keyword.control.flow.bird",
          match: "\\b(?:accept|reject|error)\\b"
        },
        {
          name: "keyword.control.structure.bird",
          match: "\\b(?:table|define|include|attribute|eval|ipv4|ipv6|local|as)\\b"
        }
      ]
    },
    "functional-keywords": {
      patterns: [
        {
          name: "keyword.control.protocol-type.bird",
          match: "\\b(?:static|rip|ospf|bgp|babel|rpki|bfd|device|direct|kernel|pipe|perf|mrt|aggregator|l3vpn|radv)\\b"
        },
        {
          name: "keyword.control.routing.bird",
          match: "\\b(?:graceful|restart|preference|disabled|hold|keepalive|connect|retry|start|delay|error|wait|forget|scan|randomize|router|id)\\b"
        },
        {
          name: "keyword.other.interface.bird",
          match: "\\b(?:interface|type|wired|wireless|tunnel|rxcost|limit|hello|update|interval|port|tx|class|dscp|priority|rx|buffer|length|check|link|rtt|cost|min|max|decay|send|timestamps)\\b"
        },
        {
          name: "keyword.other.auth.bird",
          match: "\\b(?:authentication|none|mac|permissive|password|generate|accept|from|to|algorithm|hmac|sha1|sha256|sha384|sha512|blake2s128|blake2s256|blake2b256|blake2b512)\\b"
        },
        {
          name: "keyword.other.time.bird",
          match: "\\b(?:time)\\b"
        },
        {
          name: "keyword.other.config.bird",
          match: "\\b(?:hostname|description|debug|log|syslog|stderr|bird|protocols|tables|channels|timeouts|passwords|bfd|confederation|cluster|stub|dead|neighbors|area|md5|multihop|passive|rfc1583compat|tick|ls|retransmit|transmit|ack|state|database|summary|external|nssa|translator|always|candidate|never|role|stability|election|action|warn|block|disable|keep|filtered|receive|modify|add|delete|withdraw|unreachable|blackhole|prohibit|unreach|igp_metric|localpref|med|origin|community|large_community|ext_community|as_path|prepend|weight|gateway|scope|onlink|recursive|multipath|igp|channel|sadr|src|learn|persist|via|ng)\\b"
        },
        {
          name: "keyword.other.flowspec.bird",
          match: "\\b(?:flow4|flow6|dst|src|proto|header|dport|sport|icmp|code|tcp|flags|dscp|dont_fragment|is_fragment|first_fragment|last_fragment|fragment|label|offset)\\b"
        },
        {
          name: "keyword.other.address.bird",
          match: "\\b(?:vpn|mpls|aspa|roa|roa6)\\b"
        }
      ]
    },
    "semantic-modifiers": {
      patterns: [
        {
          name: "keyword.other.semantic-modifier.bird",
          match: "\\b(?:self|on|off|remote|extended)\\b"
        }
      ]
    },
    "filter-names": {
      patterns: [
        {
          name: "entity.name.function.filter.bird",
          match: "\\b[a-zA-Z_][a-zA-Z0-9_]*_filter\\b"
        }
      ]
    },
    "user-variables": {
      patterns: [
        {
          name: "variable.other.user-defined.bird",
          match: "\\b[A-Z][a-zA-Z0-9_]*\\b"
        }
      ]
    },
    "builtin-functions": {
      patterns: [
        {
          name: "support.function.builtin.bird",
          match: "\\b(?:defined|unset|print|printn|roa_check|aspa_check|aspa_check_downstream|aspa_check_upstream|from_hex|format|prepend|add|delete|filter|empty|reset|bt_assert|bt_test_suite|bt_test_same)\\b"
        }
      ]
    },
    "method-properties": {
      patterns: [
        {
          name: "support.variable.property.bird",
          match: "\\b(?:first|last|last_nonaggregated|len|asn|data|data1|data2|is_v4|ip|src|dst|rd|maxlen|type|mask|min|max)\\b"
        }
      ]
    },
    "route-attributes": {
      patterns: [
        {
          name: "support.variable.route-attribute.bird",
          match: "\\b(?:net|scope|preference|from|gw|proto|source|dest|ifname|ifindex|weight|gw_mpls|gw_mpls_stack|onlink|igp_metric|mpls_label|mpls_policy|mpls_class|bgp_path|bgp_origin|bgp_next_hop|bgp_med|bgp_local_pref|bgp_community|bgp_ext_community|bgp_large_community|bgp_originator_id|bgp_cluster_list|ospf_metric1|ospf_metric2|ospf_tag|ospf_router_id|rip_metric|rip_tag|mypath|mylclist)\\b"
        }
      ]
    },
    "data-types": {
      patterns: [
        {
          name: "storage.type.bird",
          match: "\\b(?:int|bool|ip|prefix|rd|pair|quad|ec|lc|string|bytestring|bgpmask|bgppath|clist|eclist|lclist|set|enum|route)\\b"
        }
      ]
    },
    operators: {
      patterns: [
        {
          name: "keyword.operator.comparison.bird",
          match: "(?:==|!=|<=|>=|<|>|=|~|!~)"
        },
        {
          name: "keyword.operator.logical.bird",
          match: "(?:&&|\\|\\||!|->)"
        },
        {
          name: "keyword.operator.arithmetic.bird",
          match: "(?:\\+|\\-|\\*|/|%)"
        },
        {
          name: "keyword.operator.range.bird",
          match: "\\.\\."
        },
        {
          name: "keyword.operator.assignment.bird",
          match: "="
        },
        {
          name: "keyword.operator.accessor.bird",
          match: "\\."
        }
      ]
    },
    constants: {
      patterns: [
        {
          name: "constant.language.boolean.bird",
          match: "\\b(?:on|off|yes|no|true|false)\\b"
        },
        {
          name: "constant.language.special.bird",
          match: "\\b(?:empty|unknown|generic|rt|ro|one|ten)\\b"
        },
        {
          name: "constant.language.scope.bird",
          match: "\\b(?:SCOPE_HOST|SCOPE_LINK|SCOPE_SITE|SCOPE_ORGANIZATION|SCOPE_UNIVERSE)\\b"
        },
        {
          name: "constant.language.source.bird",
          match: "\\b(?:RTS_STATIC|RTS_INHERIT|RTS_DEVICE|RTS_RIP|RTS_OSPF|RTS_OSPF_IA|RTS_OSPF_EXT1|RTS_OSPF_EXT2|RTS_BGP|RTS_PIPE|RTS_BABEL)\\b"
        },
        {
          name: "constant.language.dest.bird",
          match: "\\b(?:RTD_ROUTER|RTD_DEVICE|RTD_MULTIPATH|RTD_BLACKHOLE|RTD_UNREACHABLE|RTD_PROHIBIT)\\b"
        },
        {
          name: "constant.language.roa.bird",
          match: "\\b(?:ROA_UNKNOWN|ROA_INVALID|ROA_VALID)\\b"
        },
        {
          name: "constant.language.aspa.bird",
          match: "\\b(?:ASPA_UNKNOWN|ASPA_INVALID|ASPA_VALID)\\b"
        },
        {
          name: "constant.language.net-type.bird",
          match: "\\b(?:NET_IP4|NET_IP6|NET_IP6_SADR|NET_VPN4|NET_VPN6|NET_ROA4|NET_ROA6|NET_FLOW4|NET_FLOW6|NET_MPLS)\\b"
        },
        {
          name: "constant.language.mpls.bird",
          match: "\\b(?:MPLS_POLICY_NONE|MPLS_POLICY_STATIC|MPLS_POLICY_PREFIX|MPLS_POLICY_AGGREGATE|MPLS_POLICY_VRF)\\b"
        }
      ]
    },
    "function-calls": {
      patterns: [
        {
          name: "meta.function-call.bird",
          begin: "\\b([a-zA-Z_][a-zA-Z0-9_]*)\\s*\\(",
          end: "\\)",
          beginCaptures: {
            1: {
              name: "entity.name.function.call.bird"
            }
          },
          patterns: [
            {
              include: "$self"
            }
          ]
        }
      ]
    },
    "method-calls": {
      patterns: [
        {
          name: "meta.method-call.bird",
          begin: "\\.\\s*([a-zA-Z_][a-zA-Z0-9_]*)\\s*\\(",
          end: "\\)",
          beginCaptures: {
            1: {
              name: "entity.name.function.method.bird"
            }
          },
          patterns: [
            {
              include: "$self"
            }
          ]
        },
        {
          name: "meta.method-access.bird",
          match: "\\.\\s*([a-zA-Z_][a-zA-Z0-9_]*)",
          captures: {
            1: {
              name: "variable.other.property.bird"
            }
          }
        }
      ]
    },
    "variable-declarations": {
      patterns: [
        {
          name: "meta.variable-declaration.bird",
          match: "\\b(int|bool|ip|prefix|rd|pair|quad|ec|lc|string|bytestring|bgpmask|bgppath|clist|eclist|lclist|set|enum|route)\\s+([a-zA-Z_][a-zA-Z0-9_]*)(?:\\s*=|;)",
          captures: {
            1: {
              name: "storage.type.bird"
            },
            2: {
              name: "variable.other.declaration.bird"
            }
          }
        }
      ]
    },
    symbols: {
      patterns: [
        {
          name: "variable.other.bird",
          match: "\\b[a-zA-Z_][a-zA-Z0-9_]*\\b"
        }
      ]
    },
    blocks: {
      patterns: [
        {
          name: "meta.block.bird",
          begin: "\\{",
          end: "\\}",
          beginCaptures: {
            0: {
              name: "punctuation.definition.block.begin.bird"
            }
          },
          endCaptures: {
            0: {
              name: "punctuation.definition.block.end.bird"
            }
          },
          patterns: [
            {
              include: "$self"
            }
          ]
        },
        {
          name: "meta.set.bird",
          begin: "\\[",
          end: "\\]",
          beginCaptures: {
            0: {
              name: "punctuation.definition.set.begin.bird"
            }
          },
          endCaptures: {
            0: {
              name: "punctuation.definition.set.end.bird"
            }
          },
          patterns: [
            {
              include: "$self"
            }
          ]
        },
        {
          name: "meta.tuple.bird",
          begin: "\\(",
          end: "\\)",
          beginCaptures: {
            0: {
              name: "punctuation.definition.tuple.begin.bird"
            }
          },
          endCaptures: {
            0: {
              name: "punctuation.definition.tuple.end.bird"
            }
          },
          patterns: [
            {
              include: "$self"
            }
          ]
        },
        {
          name: "punctuation.terminator.statement.bird",
          match: ";"
        },
        {
          name: "punctuation.separator.bird",
          match: ","
        }
      ]
    }
  },
  foldingStartMarker: "\\{\\s*$",
  foldingStopMarker: "^\\s*\\}"
};